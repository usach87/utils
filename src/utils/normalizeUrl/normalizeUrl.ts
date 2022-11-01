export const normalizeUrl = (url: string): string => (url.startsWith('http://') || url.startsWith('https://')
  ? url
  : `//${url}`);
