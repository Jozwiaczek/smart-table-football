import { createMuiTheme } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'

const _compatibilityTheme = {
  props: {
    MuiTabs: {
      scrollable: true,
      scrollButtons: 'off'
    }
  },
  overrides: {
    MuiTabs: {
      root: {
        maxWidth: '100vw'
      }
    }
  },
  palette: {
    secondary: {
      light: '#5f5fc4',
      main: '#283593',
      dark: '#001064',
      contrastText: '#fff'
    },
    loading: {
      light: grey[50],
      color: grey[200],
      dark: grey[300]
    }
  }
}

const _darkTheme = {
  ..._compatibilityTheme,
  palette: {
    type: 'dark' // Switching the dark mode on is a single property value change.
  },
  overrides: {
    MuiTabs: {
      root: {
        ..._compatibilityTheme.overrides.MuiTabs.root,
        color: 'white'
      }
    }
  }
}

export const defaultTheme = createMuiTheme(_compatibilityTheme)

export const darkTheme = createMuiTheme(_darkTheme)
