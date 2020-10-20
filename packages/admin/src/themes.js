import { createMuiTheme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const _compatibilityTheme = {
  palette: {
    secondary: {
      light: '#5f5fc4',
      main: '#283593',
      dark: '#001064',
      contrastText: '#fff',
    },
    loading: {
      light: grey[50],
      color: grey[200],
      dark: grey[300],
    },
  },
  props: {
    MuiTabs: {
      scrollable: true,
      scrollButtons: 'off',
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
        borderLeft: '4px solid #283593',
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
};

export const defaultTheme = createMuiTheme(_compatibilityTheme);
