import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Field, Form } from 'react-final-form'
import compose from 'recompose/compose'
import { Button, CardActions, CardContent, CircularProgress, Typography } from '@material-ui/core'
import { createStyles, withStyles } from '@material-ui/core/styles'
import { useLogin, useNotify, useSafeSetState, useTranslate } from 'ra-core'
import { Link } from 'react-admin'
import PasswordInput from '../../../elements/PasswordInput'
import FormTextField from '../../../elements/forms/FormTextField'
import { models } from 'stf-core'
import { validateLogin } from '../validate'

const styles = () => createStyles({
  form: {
    padding: '1rem 0',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  input: {
    marginTop: '1em',
    width: '100%',
    height: '4em'
  },
  button: {
    width: '100%',
    margin: 2
  },
  loadingBar: {
    marginRight: 8
  },
  resetLink: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem'
  }
})

const LoginForm = ({ classes, redirectTo }) => {
  const [loading, setLoading] = useSafeSetState(false)
  const login = useLogin()
  const notify = useNotify()
  const translate = useTranslate()

  const submit = values => {
    setLoading(true)
    login(values, redirectTo)
      .then(() => {
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
        notify(
          typeof error === 'string'
            ? error
            : typeof error === 'undefined' || !error.message
              ? 'ra.auth.sign_in_error'
              : error.message,
          'warning'
        )
      })
  }

  return (
    <Form
      onSubmit={submit}
      validate={values => validateLogin(values, translate)}
      render={({ handleSubmit }) => <form onSubmit={handleSubmit} noValidate>
        <CardContent>
          <div className={classes.form}>
            <div className={classes.input}>
              <Field
                id='username'
                name='username'
                component={FormTextField}
                label='Email'
                disabled={loading}
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
            {translate('ra.auth.sign_in')}
          </Button>

          <Button
            color='primary'
            disabled={loading}
            className={classes.button}
            component={forwardRef(
              (props, ref) => (
                <Link to='/registration' {...props} />
              )
            )}
          >
            {translate('pos.auth.login.sign_up')}
          </Button>

          <Typography
            className={classes.resetLink}
            variant='caption'
            component={forwardRef(
              (props, ref) => (
                <Link to='/passwordReset' {...props} />
              )
            )}
          >
            I don't remember my password
          </Typography>
        </CardActions>
      </form>}
    />
  )
}

LoginForm.propTypes = {
  classes: PropTypes.object,
  redirectTo: PropTypes.string
}

const enhance = compose(
  withStyles(styles)
)

export default enhance(LoginForm)
