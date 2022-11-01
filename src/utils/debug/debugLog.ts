import { getIsDebugMode } from './getIsDebugMode';

export const debugLog = <T, K>(message?: T, ...optionalParams: K[]): void => {
  if (getIsDebugMode()) {
    console.log(message, ...optionalParams);
  }
};
