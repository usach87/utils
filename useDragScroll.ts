  let position = { top: 0, left: 0, x: 0, y: 0 };

  const mouseMoveHandler: EventListenerOrEventListenerObject = useCallback((e) => {
    if (!tableRef.current) return;

    const { clientX, clientY } = e as unknown as MouseEvent;
    // How far the mouse has been moved
    const dx = clientX - position.x;
    const dy = clientY - position.y;

    // Scroll the element
    tableRef.current.scrollTop = position.top - dy;
    tableRef.current.scrollLeft = position.left - dx;
  }, [position.left, position.top, position.x, position.y]);

  const mouseUpHandler = useCallback(() => {
    if (!tableRef.current) return;

    tableRef.current.style.cursor = "grab";
    tableRef.current.style.removeProperty("user-select");

    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  }, [mouseMoveHandler]);

  const mouseDownHandler: EventListenerOrEventListenerObject = useCallback((e) => {
    if (!tableRef.current) return;

    const { clientX, clientY } = e as unknown as MouseEvent;

    tableRef.current.style.cursor = "grabbing";
    tableRef.current.style.userSelect = "none";

    position = {
      left: tableRef.current.scrollLeft,
      top: tableRef.current.scrollTop,
      x: clientX,
      y: clientY,
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  }, [mouseMoveHandler, mouseUpHandler]);

  useEffect(() => {
    if (!tableRef.current) return;

    tableRef.current.addEventListener("mousedown", mouseDownHandler);
    tableRef.current.style.cursor = "grab";

    return () => {
      tableRef.current?.removeEventListener("dragenter", mouseDownHandler);
    };
  }, [mouseDownHandler]);
