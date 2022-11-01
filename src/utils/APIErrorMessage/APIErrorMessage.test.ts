import { APIErrorMessage, TAPIError } from './APIErrorMessage';

const NON_EXISTED_ERROR_CODE = Infinity;
const EXPECTED_DEFAULT_ERROR_CODE = -1;
const EXPECTED_DEFAULT_FALLBACK_MESSAGE = 'Что-то пошло не так';
const EXPECTED_DEFAULT_DICT = {};
const SAMPLE_DICT = {
  '-1': 'error message for code -1',
  0: 'error message for code 0',
  1: 'error message for code 1',
};

const mockAPIError = (code: any, message?: any) => ({ error: { code, message } });

describe('apiErrorMessage', () => {
  const {
    getMessage, getOriginalMessage, getDict, getCode, registerErrorsMessages,
  } = APIErrorMessage;

  afterEach(() => {
    registerErrorsMessages(EXPECTED_DEFAULT_DICT);
  });

  it('registerErrorsMessages действительно расширяет словарь', () => {
    expect(getDict()).toEqual(EXPECTED_DEFAULT_DICT);
    registerErrorsMessages(SAMPLE_DICT);
    expect(getDict()).toEqual(SAMPLE_DICT);
  });
  it('getMessage возвращает значение из словаря', () => {
    registerErrorsMessages(SAMPLE_DICT);
    expect(getMessage(null)).toEqual(EXPECTED_DEFAULT_FALLBACK_MESSAGE);
    expect(getMessage(mockAPIError(1))).toEqual(SAMPLE_DICT[1]);
    expect(getMessage(mockAPIError(-1))).toEqual(SAMPLE_DICT[-1]);
  });
  it('getMessage возвращает правильный fallbackMessage', () => {
    const EXPECTED_CUSTOM_FALLBACK_MESSAGE = 'custom';

    expect(getMessage(null)).toEqual(EXPECTED_DEFAULT_FALLBACK_MESSAGE);
    expect(getMessage(mockAPIError(100))).toEqual(EXPECTED_DEFAULT_FALLBACK_MESSAGE);
    expect(getMessage(mockAPIError(100), EXPECTED_CUSTOM_FALLBACK_MESSAGE)).toEqual(EXPECTED_CUSTOM_FALLBACK_MESSAGE);

    expect(getMessage(mockAPIError(NON_EXISTED_ERROR_CODE), EXPECTED_CUSTOM_FALLBACK_MESSAGE))
      .toEqual(EXPECTED_CUSTOM_FALLBACK_MESSAGE);

    expect(getMessage(mockAPIError(NON_EXISTED_ERROR_CODE), EXPECTED_CUSTOM_FALLBACK_MESSAGE))
      .toEqual(EXPECTED_CUSTOM_FALLBACK_MESSAGE);
  });
  it('getCode возвращает правильный code', () => {
    expect(getCode(null)).toEqual(EXPECTED_DEFAULT_ERROR_CODE);
    expect(getCode(mockAPIError(100))).toEqual(100);
    expect(getCode(mockAPIError(-1))).toEqual(-1);
    // если нарушают контракт
    expect(getCode(mockAPIError('foo'))).toEqual('foo');
  });

  describe('getOriginalMessage', () => {
    test.each([
      [undefined],
      [null],
    ])('empty apiError (equals "%s") is passed and fallback message is not passed '
      + 'then default fallback message is returned', (apiError) => {
      expect(getOriginalMessage(apiError)).toEqual(EXPECTED_DEFAULT_FALLBACK_MESSAGE);
    });

    test.each([
      [undefined, 'Ошибка!'],
      [null, 'Все сломалось :('],
      [{}, 'Ну ошибка же!'],
    ])('empty apiError (equals "%s") and fallback message equals "%s" is passed '
      + 'then passed fallback message is returned', (apiError, fallbackMessage) => {
      expect(getOriginalMessage(apiError as unknown as TAPIError, fallbackMessage)).toEqual(fallbackMessage);
    });

    it('apiError with single error as object is passed then original error message is returned', () => {
      const ERROR_CODE = 1;
      const ORIGINAL_ERROR_MESSAGE = 'Text of original message from the server';

      registerErrorsMessages({
        [ERROR_CODE]: 'error message for code 1',
      });

      const apiError = {
        error: {
          code: ERROR_CODE,
          message: ORIGINAL_ERROR_MESSAGE,
        },
      };

      expect(getOriginalMessage(apiError)).toEqual(ORIGINAL_ERROR_MESSAGE);
    });

    it('apiError with single error as array is passed '
      + 'then original error message of the first error is returned', () => {
      const ERROR_CODE_1 = 1;
      const ERROR_CODE_2 = 2;

      const ORIGINAL_ERROR_MESSAGE_1 = 'Text of original message 1 from the server';
      const ORIGINAL_ERROR_MESSAGE_2 = 'Text of original message 2 from the server';

      registerErrorsMessages({
        [ERROR_CODE_1]: 'error message for code 1',
        [ERROR_CODE_2]: 'error message for code 2',
      });

      const apiError = {
        error: [
          {
            code: ERROR_CODE_1,
            message: ORIGINAL_ERROR_MESSAGE_1,
          },
          {
            code: ERROR_CODE_2,
            message: ORIGINAL_ERROR_MESSAGE_2,
          },
        ],
      };

      expect(getOriginalMessage(apiError)).toEqual(ORIGINAL_ERROR_MESSAGE_1);
    });
  });
});
