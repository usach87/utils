export const logger = (() => {
  let isEnabled = true;

  // args left for ts
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  const NOOP = (...args: any[]) => {};
  // eslint-disable-next-line @typescript-eslint/ban-types
  const dump = (cb: Function) => {
    if (isEnabled && console) {
      try {
        cb();
      } catch (err) {
        //
      }
    }
  };

  const enum LogLevel {
    ERROR = 'error',
    INFO = 'info',
    LOG = 'log',
    WARN = 'warn',
  }

  if (!window.location.href.match(/[?&#]id2_debug_mode=true/i)) {
    isEnabled = false;

    return {
      [LogLevel.ERROR]: NOOP,
      [LogLevel.INFO]: NOOP,
      [LogLevel.LOG]: NOOP,
      [LogLevel.WARN]: NOOP,
      dump,
    };
  }

  const showStack = true;
  const showCollapsed = true;

  const levelToStyle: { [key: string]: string } = {
    [LogLevel.ERROR]: 'color:red;',
    [LogLevel.INFO]: 'color:blue;',
    [LogLevel.LOG]: 'color:black;',
    [LogLevel.WARN]: 'color:yellow;',
  };

  const extractLineNumberFromStack = (stack: string) => {
    let line = stack.split('\n')[3];

    line = line.indexOf(' (') > -1
      ? line.split(' (')[1].substring(0, line.length - 1)
      : line.split('at ')[1];

    return line;
  };

  const make = (level: string) => (...args: any[]) => {
    try {
      if (!isEnabled) return;

      let title = level;

      if (args[0] && typeof args[0] === 'string') {
        title = args.shift();
      }

      const log = new Error();
      const { lineNumber, fileName, stack } = log as any;

      const at = lineNumber
        ? `${fileName}:${lineNumber}:1`
        : extractLineNumberFromStack(stack);

      if (console && (console as any)[level]) {
        (console as any)[showCollapsed ? 'groupCollapsed' : 'group'](
          '%c%s%c :: %c%s%c (%s',
          'color:gray;',
          'AOH',
          '',
          levelToStyle[level],
          title,
          '',
          at,
        );
        if ((console as any)[level].apply) {
          (console as any)[level].apply(console, args);
        } else {
          (console as any)[level](args);
        }

        if (showStack) {
          const place: string[] = [];
          const blackList = [
            'Object.error',
            'Object.info',
            'Object.log',
            'Object.warn',
          ];

          stack.split('\n').forEach((l: string) => {
            const p = l.trim().split(' ');

            if (p && p[1] && blackList.indexOf(p[1]) === -1) {
              place.push(p[1]);
            }
          });

          if (place.length) {
            console.info(place);
          }
        }

        console.groupEnd();
      }
    } catch (err) {
      // console.error(err);
    }
  };

  return {
    [LogLevel.ERROR]: make(LogLevel.ERROR),
    [LogLevel.INFO]: make(LogLevel.INFO),
    [LogLevel.LOG]: make(LogLevel.LOG),
    [LogLevel.WARN]: make(LogLevel.WARN),
    dump,
  };
})();
