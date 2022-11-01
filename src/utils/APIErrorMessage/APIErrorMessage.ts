/**
 * ex:
{
 "-3001": 'Неверное значение поля Фамилия',
 1011: 'Эта почта заблокирована и не может использоваться в качестве логина. Используйте другую почту',
 1004: `
   <p>К сожалению, мы не можем добавить указанного пользователя в продукт, т.к. он не подтвердил регистрацию на сайте <a href="https://id2.action-media.ru" target="_blank" rel="noopener noreferrer">https://id2.action-media.ru</a>.</p>
   <p>Необходимо обратиться к вашему персональному менеджеру или по телефону <a href="tel:+78006003601">8 800 600 360 1</a></p>
 `,
}
 */
const DEFAULT_API_ERROR_MESSAGE = 'Что-то пошло не так';
const DEFAULT_API_ERROR_CODE = -1;

export type TAPIErrorDescriptor = { code: number; message: string; };
export type TAPIError = null | undefined | { error: TAPIErrorDescriptor | TAPIErrorDescriptor[] };
export type TAPIErrorDict = { [key: string]: string };

export interface IAPIErrorMessage {
  registerErrorsMessages(kv?: TAPIErrorDict): TAPIErrorDict;
  getMessage(apiError: TAPIError, fallbackMessage?: string): string;
  getOriginalMessage(apiError: TAPIError, fallbackMessage?: string): string;
  getCode(apiError: TAPIError): number;
  getDict(): TAPIErrorDict;
  parse(apiError: TAPIError): {
    code: number;
    message: string;
  };
}

export const APIErrorMessage: IAPIErrorMessage = (() => {
  let dictErrors: TAPIErrorDict = {};

  const getError = (apiError: TAPIError): TAPIErrorDescriptor | null => {
    if (!apiError) {
      return null;
    }

    const { error } = apiError;

    if (!error) {
      return null;
    }

    if (Array.isArray(error)) {
      return error[0];
    }

    return error;
  };

  const getCode = (apiError: TAPIError) => {
    const error = getError(apiError);

    return error?.code ?? DEFAULT_API_ERROR_CODE;
  };

  const getMessage = (apiError: TAPIError, fallbackMessage?: string) => {
    if (!apiError) {
      return fallbackMessage || DEFAULT_API_ERROR_MESSAGE;
    }

    return dictErrors[getCode(apiError)] || fallbackMessage || DEFAULT_API_ERROR_MESSAGE;
  };

  const getOriginalMessage = (apiError: TAPIError, fallbackMessage?: string): string => {
    const error = getError(apiError);

    return error?.message || fallbackMessage || DEFAULT_API_ERROR_MESSAGE;
  };

  const getDict = () => dictErrors;

  const parse = (apiError: TAPIError) => ({
    code: getCode(apiError),
    message: getMessage(apiError),
  });

  const registerErrorsMessages = (kv = {}) => {
    dictErrors = {
      ...dictErrors,
      ...kv,
    };

    return getDict();
  };

  return {
    getCode,
    getDict,
    getMessage,
    getOriginalMessage,
    parse,
    registerErrorsMessages,
  };
})();
