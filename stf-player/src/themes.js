import { createMuiTheme } from '@material-ui/core/styles';
import { green, grey, orange } from '@material-ui/core/colors';
import { constants } from 'stf-core';

export const themeProvider = (mode) => {
  const darkMode = mode === constants.themeMode.type.dark && true;

  return createMuiTheme({
    props: {
      MuiTabs: {
        scrollable: true,
        scrollButtons: 'off',
      },
    },
    overrides: {
      MuiTabs: {
        root: {
          maxWidth: '100vw',
        },
      },
    },
    palette: {
      type: darkMode ? constants.themeMode.type.dark : constants.themeMode.type.light,
      primary: orange,
      secondary: grey,
      background: {
        default: darkMode ? '#363636' : '#fafafa',
      },
      loading: {
        light: darkMode ? grey[800] : grey[50],
        color: darkMode ? grey[900] : grey[200],
        dark: darkMode ? 'black' : grey[300],
      },
      success: {
        main: darkMode ? green[900] : green[200],
      },
    },
  });
};
