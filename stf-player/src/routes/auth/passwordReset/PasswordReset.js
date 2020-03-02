import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  connect
} from 'react-redux'
import { Field, Form } from 'react-final-form'
import compose from 'recompose/compose'

import FormTextField from '../../../elements/FormTextField'

import {
  Link,
  Notification,
  showNotification
} from 'react-admin'
import { translate } from 'ra-core'
import {
  Button,
  Typography,
  MuiThemeProvider,
  Card,
  CardContent,
  CircularProgress
} from '@material-ui/core'
import { withStyles, createStyles } from '@material-ui/core/styles'
import { models, constants } from 'stf-core'
import red from '@material-ui/core/colors/red'
import { themeProvider } from '../../../themes'
import dataProvider from '../../../dataProvider'
import validator from 'validator'
import Ball from '../../../elements/Ball'
import BackgroundGraphic from '../../../elements/BackgroundGraphic'
import Logo from '../../../elements/Logo'

const styles = () => createStyles({
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
})

const validate = (values) => {
  const errors = { username: undefined, password: undefined }

  if (!values[models.players.fields.email]) {
    errors[models.players.fields.email] = translate('ra.validation.required')
  } else if (!validator.isEmail(values[models.players.fields.email])) {
    errors[models.players.fields.email] = 'Incorrect email'
  }

  return errors
}

class PasswordReset extends Component {
  constructor (props) {
    super(props)
    this.state = {
      theme: null,
      processing: false
    }
    this.sendEmail = this.sendEmail.bind(this)
  }

  async sendEmail (userData) {
    try {
      this.setState({ processing: true })
      await dataProvider('CREATE', constants.resources.playerAuthManagement, {
        data: {
          action: 'sendResetPwd',
          value: { email: userData.email }
        }
      })
      this.props.history.push('/passwordEmailSend')
    } catch (e) {
      this.setState({ processing: false })
      await this.props.showNotification(e.message, 'warning')
    }
  }

  async componentDidMount () {
    this.setState({ theme: await themeProvider() })
  }

  render () {
    const { classes } = this.props

    if (!this.state.theme) {
      return null
    }

    return (
      <BackgroundGraphic graphic={<Ball />} className={classes.main}>
        <MuiThemeProvider theme={this.state.theme}>
          <Card className={classes.card}>
            <CardContent>
              <Logo linkTo='/login' />
              <Form
                onSubmit={this.sendEmail}
                validate={validate}
                render={({ handleSubmit }) => (
                  <form onSubmit={handleSubmit} className={classes.form}>
                    <Field
                      autoFocus
                      id={models.players.fields.email}
                      name={models.players.fields.email}
                      component={FormTextField}
                      label='Email'
                      disabled={this.state.processing}
                      required
                      className={classes.input}
                    />
                    <Button
                      type='submit'
                      variant='contained'
                      color='primary'
                      disabled={this.state.processing}
                      className={classes.button}
                    >
                      {
                        this.state.processing &&
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
}
PasswordReset.propTypes = {
  classes: PropTypes.object,
  redirectTo: PropTypes.string
}

const enhance = compose(
  withStyles(styles),
  connect(null, { showNotification }),
  translate
)

export default enhance(PasswordReset)
