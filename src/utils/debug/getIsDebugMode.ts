import { parseSearchParams } from '../searchParams/searchParams';

export const DEUBUG_MODE_PARAM_NAME = 'debugmode';

export const getIsDebugMode = (): boolean => {
  const params = parseSearchParams(window.location.search);

  return (
    Object.prototype.hasOwnProperty.call(params, DEUBUG_MODE_PARAM_NAME)
    && params[DEUBUG_MODE_PARAM_NAME] !== 'false'
  );
};
