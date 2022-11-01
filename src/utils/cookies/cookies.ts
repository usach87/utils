export function parseCookie(): { [index: string]: any } {
  return document.cookie.split(';')
    .map((cookie) => cookie.trim().split('='))
    .reduce((acc: { [index: string]: any }, strArr) => {
      try {
        acc[decodeURIComponent(strArr[0])] = JSON.parse(decodeURIComponent(strArr[1]));
      } catch (e) {
        const [a, b] = strArr;

        acc[a] = b;
      }

      return acc;
    }, {});
}

export function getCookie(name: string): string | undefined {
  const parsedCookie = parseCookie();

  return parsedCookie[name];
}

export function setCookie(name: string, value: string, minutes: number): void {
  const date = new Date(new Date().getTime() + minutes * 60 * 1000);

  document.cookie = `${name}=${value}; path=/; expires=${date}`;
}
