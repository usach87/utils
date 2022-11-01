const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const cyrillicNameRegEx = /^[А-ЯЁа-яё\-\s]+$/;

export const validateEmail = (email: string): boolean => (
  emailRegEx.test(email.toLowerCase())
);

export const validateCyrillicName = (value: string): boolean => (
  cyrillicNameRegEx.test(String(value).toLowerCase())
);
