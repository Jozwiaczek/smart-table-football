import React, { useEffect } from 'react'
import { Link, Notification } from 'react-admin'

import { Button, Card, CardContent, MuiThemeProvider, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { themeProvider } from '../../../themes'
import Ball from '../../../elements/Ball'
import BackgroundGraphic from '../../../elements/BackgroundGraphic'
import Logo from '../../../elements/Logo'

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    padding: '1rem',
    width: '100%',
    minWidth: 200,
    maxWidth: 400,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    boxSizing: 'border-box'
  },
  logo: {
    marginBottom: '2rem'
  },
  button: {
    width: '100%'
  },
  text: {
    textAlign: 'center',
    marginBottom: '3rem'
  }
}))

const PasswordEmailSend = () => {
  const [theme, setTheme] = React.useState(null)

  const classes = useStyles()

  useEffect(() => {
    const setThemeProvider = async () => {
      setTheme(await themeProvider())
    }
    setThemeProvider()
  }, [])

  if (!theme) {
    return null
  }

  return (
    <BackgroundGraphic graphic={<Ball />} className={classes.main}>
      <MuiThemeProvider theme={theme}>
        <Card className={classes.card}>
          <CardContent>
            <Logo linkTo='/login' className={classes.logo} />
            <Typography className={classes.text} variant='h5'>
              Email has been sent.<br />
              Please check your emails.
            </Typography>
            <Button
              type='submit'
              variant='contained'
              component={Link}
              to='/login'
              color='primary'
              className={classes.button}
            >
              Go to login page
            </Button>
          </CardContent>
        </Card>
        <Notification />
      </MuiThemeProvider>
    </BackgroundGraphic>
  )
}

export default PasswordEmailSend
