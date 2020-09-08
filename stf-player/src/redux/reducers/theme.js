import { SET_THEME } from '../actions/types';
import { themeProvider } from '../../themes';

const INITIAL_STATE = {
  currentTheme: themeProvider(),
};

export const ThemeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        currentTheme: themeProvider(action.payload),
      };
    default:
      return state;
  }
};
