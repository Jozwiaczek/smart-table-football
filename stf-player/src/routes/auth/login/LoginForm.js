import React from 'react'
import PropTypes from 'prop-types'
import { Field, Form } from 'react-final-form'
import compose from 'recompose/compose'
import {
  CardActions,
  Button,
  TextField,
  CircularProgress,
  CardContent,
  Typography
} from '@material-ui/core'
import { withStyles, createStyles } from '@material-ui/core/styles'
import { useTranslate, useLogin, useNotify, useSafeSetState } from 'ra-core'
import { Link } from 'react-admin'
import PasswordInput from '../../../elements/PasswordInput'

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

const Input = ({
  meta: { touched, error }, // eslint-disable-line react/prop-types
  input: inputProps, // eslint-disable-line react/prop-types
  ...props
}) => (
  <TextField
    error={!!(touched && error)}
    helperText={touched && error}
    {...inputProps}
    {...props}
    fullWidth
  />
)

const LoginForm = ({ classes, redirectTo }) => {
  const [loading, setLoading] = useSafeSetState(false)
  const login = useLogin()
  const notify = useNotify()
  const translate = useTranslate()

  const validate = (values) => {
    const errors = { username: undefined, password: undefined }

    if (!values.username) {
      errors.username = translate('ra.validation.required')
    }
    if (!values.password) {
      errors.password = translate('ra.validation.required')
    }
    return errors
  }

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
      validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} noValidate>
          <CardContent>
            <div className={classes.form}>
              <div className={classes.input}>
                <Field
                  autoFocus
                  id='username'
                  name='username'
                  component={Input}
                  label='Email'
                  disabled={loading}
                />
              </div>
              <div className={classes.input}>
                <Field
                  id='password'
                  name='password'
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
              component={Link}
              to='/registration'
            >
              Sign Up
            </Button>
            <Typography className={classes.resetLink} component={Link} to='/passwordReset' variant='caption'>
              I don't remember my password
            </Typography>
          </CardActions>
        </form>
      )}
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
