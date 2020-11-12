import { defaultThemeProvider } from 'stf-ui-components';

import { SET_THEME } from '../actions/types';

const INITIAL_STATE = {
  currentTheme: defaultThemeProvider(),
};

export const ThemeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        currentTheme: defaultThemeProvider(action.payload),
      };
    default:
      return state;
  }
};
