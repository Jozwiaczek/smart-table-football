import { SET_THEME } from './types';

export const setTheme = (mode) => ({
  type: SET_THEME,
  payload: mode,
});
