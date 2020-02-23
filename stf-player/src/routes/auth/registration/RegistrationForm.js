import React from 'react'
import PropTypes from 'prop-types'
import { Field, Form } from 'react-final-form'
import compose from 'recompose/compose'
import {
  CardActions,
  Button,
  CircularProgress,
  CardContent,
  Typography
} from '@material-ui/core'
import { withStyles, createStyles } from '@material-ui/core/styles'
import { useTranslate, useLogin, useNotify, useSafeSetState } from 'ra-core'
import {
  Link,
  withDataProvider
} from 'react-admin'
import { models, constants } from '../../../../../stf-core'
import FormTextField from '../../../elements/FormTextField'
import validator from 'validator'

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

  const validate = (values) => {
    const errors = {}
    const requiredMessage = 'Required'

    if (!values[models.players.fields.firstName]) {
      errors[models.players.fields.firstName] = requiredMessage
    }

    if (!values[models.players.fields.lastName]) {
      errors[models.players.fields.lastName] = requiredMessage
    }

    if (!values[models.players.fields.email]) {
      errors[models.players.fields.email] = requiredMessage
    } else if (!validator.isEmail(values[models.players.fields.email])) {
      errors[models.players.fields.email] = 'Incorrect email'
    }

    if (!values[models.players.fields.password]) {
      errors[models.players.fields.password] = requiredMessage
    } else if (values[models.players.fields.password].length < 6) {
      errors[models.players.fields.password] = 'Password must contain at least 6 characters'
    } else if (values[models.players.fields.password] !== values['repeatPassword']) {
      errors['repeatPassword'] = 'Password must be the same as above'
    }

    return errors
  }

  const register = async values => {
    setLoading(true)
    try {
      await dataProvider('CREATE', constants.resources.players, { data: values })
      await login({ username: values[models.players.fields.email], password: values[models.players.fields.password] }, redirectTo)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      notify(
        typeof error === 'string'
          ? error
          : typeof error === 'undefined' || !error.message
            ? 'ra.auth.sign_in_error'
            : error.message,
        'warning'
      )
    }

    // login(values, redirectTo)
    //   .then(() => {
    //     setLoading(false)
    //   })
    //   .catch(error => {
    //     setLoading(false)
    //     notify(
    //       typeof error === 'string'
    //         ? error
    //         : typeof error === 'undefined' || !error.message
    //           ? 'ra.auth.sign_in_error'
    //           : error.message,
    //       'warning'
    //     )
    //   })
  }

  return (
    <Form
      onSubmit={register}
      validate={validate}
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
                  label={'First Name'}
                  disabled={loading}
                  className={classes.input}
                  required
                />
              </div>

              <div className={classes.input}>
                <Field
                  id={models.players.fields.lastName}
                  name={models.players.fields.lastName}
                  component={FormTextField}
                  label={'Last Name'}
                  disabled={loading}
                  className={classes.input}
                  required
                />
              </div>

              <div className={classes.input}>
                <Field
                  id={models.players.fields.email}
                  name={models.players.fields.email}
                  component={FormTextField}
                  label={'Email'}
                  disabled={loading}
                  className={classes.input}
                  required
                />
              </div>

              <div className={classes.input}>
                <Field
                  id={models.players.fields.password}
                  name={models.players.fields.password}
                  component={FormTextField}
                  label={'Password'}
                  type={'password'}
                  disabled={loading}
                  className={classes.input}
                  required
                />
              </div>

              <div className={classes.input}>
                <Field
                  id='repeatPassword'
                  name='repeatPassword'
                  component={FormTextField}
                  label={'Repeat password'}
                  type='password'
                  disabled={loading}
                  className={classes.lastInput}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardActions style={{ flexDirection: 'column' }} >
            <Button
              variant='contained'
              type='submit'
              color='primary'
              disabled={loading}
              className={classes.button}
            >
              {
                loading &&
                <div className={classes.loadingBar} >
                  <CircularProgress size={15} thickness={2} />
                </div>
              }
              Sign Up
            </Button>
            <Typography
              component={Link}
              to={'/login'}
              className={classes.linkToLog}
              variant={'caption'}
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
