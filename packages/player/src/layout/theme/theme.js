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
    shape: {
      borderRadius: 10,
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          body: {
            background: 'red',
          },
          '*::-webkit-scrollbar-track': {
            background: 'red',
          },
        },
      },
      MuiTabs: {
        root: {
          maxWidth: '100vw',
        },
      },
      RaMenuItemLink: {
        root: {
          borderLeft: `4px solid transparent`,
        },
        active: {
          borderLeft: '4px solid #ff9800',
        },
      },
      MuiPaper: {
        root: {
          backgroundClip: 'padding-box',
        },
      },
      MuiFilledInput: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
          '&$disabled': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
  });
};
