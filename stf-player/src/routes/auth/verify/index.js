import React, { useEffect } from 'react'

import { Button, Card, Typography } from '@material-ui/core'

import { CREATE, Link } from 'react-admin'

import { makeStyles, MuiThemeProvider } from '@material-ui/core/styles'

import PropTypes from 'prop-types'
import { themeProvider } from '../../../themes'

import dataProvider from '../../../dataProvider'

import { constants } from 'stf-core'
import Logo from '../../../elements/Logo'

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto'
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
  title: {
    margin: '2rem 0 1rem 0'
  },
  logo: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    margin: '2rem 0 0.5rem 0',
    width: '100%'
  }
}))

const Verify = ({ location }) => {
  const [theme, setTheme] = React.useState(null)
  const [verifying, setVerifying] = React.useState(true)
  const [success, setSuccess] = React.useState(false)

  const classes = useStyles()

  useEffect(() => {
    const setThemeProvider = async () => {
      setTheme(await themeProvider())
    }

    const extracted = async () => {
      const params = new URLSearchParams(location.search)
      const token = params.get('token')

      try {
        await dataProvider(CREATE, constants.resources.playerAuthManagement, {
          data: {
            action: 'verifySignupLong',
            value: token
          }
        })

        setSuccess(true)
      } catch (e) {
        console.error(e)
        setSuccess(false)
      } finally {
        setVerifying(false)
      }
    }

    extracted()
    setThemeProvider()
  }, [location])

  if (!theme) {
    return null
  }

  const renderMessage = () => {
    if (verifying) {
      return <Typography variant='h6' className={classes.title} align='center'>Loading</Typography>
    }
    if (success) {
      return <Typography variant='h6' className={classes.title} align='center'>Verification Successful</Typography>
    }
    return <Typography variant='h6' className={classes.title} align='center'>Verification Failed</Typography>
  }

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.main} style={{ backgroundColor: theme.palette.background.default }}>
        <Card className={classes.card}>
          <Logo linkTo='/login' className={classes.logo} />
          {renderMessage()}
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            component={Link}
            to='/login'
          >
            Back to app
          </Button>
        </Card>
      </div>
    </MuiThemeProvider>
  )
}

Verify.propTypes = {
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
  dataProvider: PropTypes.func,
  userLogin: PropTypes.func,
  isLoading: PropTypes.bool
}

export default Verify
