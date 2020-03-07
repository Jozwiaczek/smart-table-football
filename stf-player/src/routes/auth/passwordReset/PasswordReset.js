import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Field, Form } from 'react-final-form'
import { Link, Notification, useNotify } from 'react-admin'
import { translate } from 'ra-core'
import { Button, Card, CardContent, CircularProgress, MuiThemeProvider, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { constants, models } from 'stf-core'
import red from '@material-ui/core/colors/red'
import { themeProvider } from '../../../themes'
import dataProvider from '../../../dataProvider'
import Ball from '../../../elements/Ball'
import BackgroundGraphic from '../../../elements/BackgroundGraphic'
import Logo from '../../../elements/Logo'
import FormTextField from '../../../elements/FormTextField'
import { validatePasswordReset } from '../validate'

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    padding: '1rem 1rem 0 1rem',
    width: '100%',
    minWidth: 200,
    maxWidth: 400,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    boxSizing: 'border-box'
  },
  input: {
    marginBottom: '2rem',
    height: '2em'
  },
  button: {
    marginTop: '2rem',
    width: '100%'
  },
  warning: {
    color: red[500]
  },
  backLink: {
    marginTop: '2em'
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  loadingBar: {
    marginRight: '1em',
    display: 'flex',
    alignItems: 'center'
  }
}))

const PasswordReset = ({ history }) => {
  const [theme, setTheme] = React.useState(null)
  const [processing, setProcessing] = React.useState(false)

  const classes = useStyles()
  const notify = useNotify()

  useEffect(() => {
    const setThemeProvider = async () => {
      setTheme(await themeProvider())
    }
    setThemeProvider()
  }, [])

  const sendEmail = async userData => {
    try {
      setProcessing(true)
      await dataProvider('CREATE', constants.resources.playerAuthManagement, {
        data: {
          action: 'sendResetPwd',
          value: { email: userData.email }
        }
      })
      history.push('/passwordEmailSend')
    } catch (e) {
      setProcessing(false)
      await notify(e.message, 'warning')
    }
  }

  if (!theme) {
    return null
  }

  return (
    <BackgroundGraphic graphic={<Ball />} className={classes.main}>
      <MuiThemeProvider theme={theme}>
        <Card className={classes.card}>
          <CardContent>
            <Logo linkTo='/login' className={classes.logo} />
            <Form
              onSubmit={sendEmail}
              validate={values => validatePasswordReset(values, translate)}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className={classes.form}>
                  <Field
                    autoFocus
                    id={models.players.fields.email}
                    name={models.players.fields.email}
                    component={FormTextField}
                    label='Email'
                    disabled={processing}
                    className={classes.input}
                    required
                  />
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    disabled={processing}
                    className={classes.button}
                  >
                    {
                      processing &&
                      <div className={classes.loadingBar}>
                        <CircularProgress size={17} thickness={2} />
                      </div>
                    }
                    Send password reset link
                  </Button>
                  <Typography
                    className={classes.backLink}
                    component={Link}
                    to='/login'
                    variant='caption'
                  >
                    Back to login
                  </Typography>
                </form>
              )}
            />
          </CardContent>
        </Card>
        <Notification />
      </MuiThemeProvider>
    </BackgroundGraphic>
  )
}

PasswordReset.propTypes = {
  history: PropTypes.object
}

export default PasswordReset
