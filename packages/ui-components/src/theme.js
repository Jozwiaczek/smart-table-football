import { createMuiTheme } from '@material-ui/core/styles';
import { green, grey, orange } from '@material-ui/core/colors';
import { constants } from 'stf-core';

export const defaultThemeProvider = (
  type = constants.themeMode.type.light,
  primary = orange,
  secondary = grey,
  overrides = {},
) => {
  const isDarkMode = type === constants.themeMode.type.dark;

  return createMuiTheme({
    palette: {
      type: isDarkMode ? constants.themeMode.type.dark : constants.themeMode.type.light,
      primary,
      secondary,
      background: {
        default: isDarkMode ? '#363636' : '#fafafa',
      },
      loading: {
        light: isDarkMode ? grey[800] : grey[50],
        color: isDarkMode ? grey[900] : grey[200],
        dark: isDarkMode ? 'black' : grey[300],
      },
      success: {
        main: isDarkMode ? green[900] : green[200],
      },
    },
    shape: {
      borderRadius: 10,
    },
    overrides: {
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
          borderLeft: `4px solid ${primary['500']}`,
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
    ...overrides,
  });
};
