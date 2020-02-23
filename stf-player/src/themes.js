import { createMuiTheme } from '@material-ui/core/styles'
import { grey, green, orange } from '@material-ui/core/colors'

export const themeProvider = async (darkTheme) => {
  let darkMode = false

  if (darkTheme !== null) {
    darkMode = darkTheme
  }

  return createMuiTheme({
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
      type: darkMode ? 'dark' : 'light',
      primary: orange,
      secondary: orange,
      background: {
        default: darkMode ? '#363636' : '#fafafa'
      },
      loading: {
        light: darkMode ? grey[800] : grey[50],
        color: darkMode ? grey[900] : grey[200],
        dark: darkMode ? 'black' : grey[300]
      },
      success: {
        main: darkMode ? green[900] : green[200]
      }
    }
  })
}
