import React from 'react'
import PropTypes from 'prop-types'
import { Field, Form } from 'react-final-form'
import compose from 'recompose/compose'
import { Button, CardActions, CardContent, CircularProgress, Typography } from '@material-ui/core'
import { createStyles, withStyles } from '@material-ui/core/styles'
import { useLogin, useNotify, useTranslate, useSafeSetState } from 'ra-core'
import { Link, withDataProvider } from 'react-admin'
import { constants, models } from 'stf-core'
import FormTextField from '../../../elements/FormTextField'
import { validateRegistration } from '../validate'
import PasswordInput from '../../../elements/PasswordInput'

const styles = () => createStyles({
  form: {
    padding: '1rem 0',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  input: {
    marginBottom: '1.5em',
    height: '4em'
  },
  lastInput: {
    height: '4em'
  },
  button: {
    width: '100%',
    margin: 2
  },
  loadingBar: {
    marginRight: 8
  },
  linkToLog: {
    marginTop: 6
  }
})

const RegistrationForm = ({ classes, redirectTo, dataProvider }) => {
  const [loading, setLoading] = useSafeSetState(false)
  const login = useLogin()
  const notify = useNotify()
  const translate = useTranslate()

  const register = async values => {
    setLoading(true)
    try {
      await dataProvider('CREATE', constants.resources.players, { data: values })
      await login({ username: values[models.players.fields.email], password: values[models.players.fields.password] }, redirectTo)
    } catch (error) {
      notify(
        typeof error === 'string'
          ? error
          : typeof error === 'undefined' || !error.message
            ? 'ra.auth.sign_in_error'
            : error.message,
        'warning'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form
      onSubmit={register}
      validate={values => validateRegistration(values, translate)}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} noValidate>
          <CardContent>
            <div className={classes.form}>
              <div className={classes.input}>
                <Field
                  autoFocus
                  id={models.players.fields.firstName}
                  name={models.players.fields.firstName}
                  component={FormTextField}
                  label='First Name'
                  disabled={loading}
                  className={classes.input}
                />
              </div>

              <div className={classes.input}>
                <Field
                  id={models.players.fields.lastName}
                  name={models.players.fields.lastName}
                  component={FormTextField}
                  label='Last Name'
                  disabled={loading}
                  className={classes.input}
                />
              </div>

              <div className={classes.input}>
                <Field
                  id={models.players.fields.email}
                  name={models.players.fields.email}
                  component={FormTextField}
                  label='Email'
                  disabled={loading}
                  className={classes.input}
                />
              </div>

              <div className={classes.input}>
                <Field
                  id={models.players.fields.password}
                  name={models.players.fields.password}
                  component={PasswordInput}
                  label={translate('ra.auth.password')}
                  disabled={loading}
                  autoComplete='current-password'
                  className={classes.input}
                />
              </div>

              <div className={classes.input}>
                <Field
                  id='repeatPassword'
                  name='repeatPassword'
                  component={PasswordInput}
                  label='Repeat password'
                  disabled={loading}
                  autoComplete='current-password'
                  className={classes.lastInput}
                />
              </div>
            </div>
          </CardContent>
          <CardActions style={{ flexDirection: 'column' }}>
            <Button
              variant='contained'
              type='submit'
              color='primary'
              disabled={loading}
              className={classes.button}
            >
              {
                loading &&
                  <div className={classes.loadingBar}>
                    <CircularProgress size={15} thickness={2} />
                  </div>
              }
              Sign Up
            </Button>
            <Typography
              component={Link}
              to='/login'
              className={classes.linkToLog}
              variant='caption'
            >
              I have an account
            </Typography>
          </CardActions>
        </form>
      )}
    />
  )
}

RegistrationForm.propTypes = {
  classes: PropTypes.object,
  redirectTo: PropTypes.string
}

const enhance = compose(
  withStyles(styles),
  withDataProvider
)

export default enhance(RegistrationForm)
