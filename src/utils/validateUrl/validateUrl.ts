export const URL_REGEX = /^(https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*[-a-zA-Z0-9(@:%_+~#?&/=])?)$/;

export const isUrlValid = (url: string): boolean => (
  URL_REGEX.test(url)
);

export const validateUrl = (url: string, fallbackUrl = ''): string => (
  isUrlValid(url) ? url : fallbackUrl
);
