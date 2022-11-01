
export function openLink(url: string): void {
  if (!url) {
    return;
  }

  window.open(url, '_blank', 'noopener, noreferrer');
}

export function openLinkV2(url: string): boolean {
  if (!url) {
    return false;
  }

  /*
    Не испольуем параметр 'noopener' для того, чтобы проверить, удалось или нет открыть ссылку.
    Проверка нужна для тех случаев, когда ссылка открывается асинхронно и браузер может
    заблокировать открытие ссылки из-за большого таймаута после пользовательского действия.
  */
  const openedWindow = window.open(url, '_blank');
  const isOpened = !!(openedWindow?.opener);

  // После проверки убираем ссылку на нашу страницу в открытом окне
  if (openedWindow) {
    openedWindow.opener = null;
  }

  return isOpened;
}
