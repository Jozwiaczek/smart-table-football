import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Field, Form } from 'react-final-form'
import compose from 'recompose/compose'
import FormTextField from '../../../elements/FormTextField'

import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography
} from '@material-ui/core'

import {
  MuiThemeProvider,
  withStyles,
  createStyles
} from '@material-ui/core/styles'

import red from '@material-ui/core/colors/red'

import dataProvider from '../../../dataProvider'

import { models, constants } from 'stf-core'
import PropTypes from 'prop-types'
import { themeProvider } from '../../../themes'
import Ball from '../../../elements/Ball'
import BackgroundGraphic from '../../../elements/BackgroundGraphic'
import { Notification, showNotification } from 'react-admin'
import Logo from '../../../elements/Logo'

const styles = () => {
  return createStyles({
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
    input: {
      marginBottom: '2.5rem',
      height: '2em'
    },
    lastInput: {
      height: '2em'
    },
    button: {
      width: '100%'
    },
    logo: {
      marginBottom: '2rem'
    },
    loadingBar: {
      marginRight: '1em',
      display: 'flex',
      alignItems: 'center'
    },
    warning: {
      marginTop: '2rem',
      marginBottom: '0.5rem',
      textAlign: 'center',
      color: red[500]
    },
    divider: {
      marginTop: '2.5rem',
      width: '100%',
      height: '1rem'
    },
    title: {
      margin: '1rem 0rem'
    }
  })
}

const validate = (values) => {
  const errors = {}
  const requiredMessage = 'Required'

  if (!values[models.players.fields.password]) {
    errors[models.players.fields.password] = requiredMessage
  } else if (values[models.players.fields.password].length < 6) {
    errors[models.players.fields.password] = 'Password must contain at least 6 characters'
  } else if (values[models.players.fields.password] !== values.repeatPassword) {
    errors.repeatPassword = 'Password must be the same as above'
  }

  return errors
}

class PasswordRecovery extends Component {
  constructor (props) {
    super(props)
    this.state = {
      theme: null,
      processing: false
    }
    this.changePassword = this.changePassword.bind(this)
  }

  async changePassword (formData) {
    try {
      this.setState({ processing: true })
      const token = new URLSearchParams(this.props.location.search).get('reset_token')

      await dataProvider('CREATE', constants.resources.playerAuthManagement, {
        data: {
          action: 'resetPwdLong',
          value: {
            token,
            password: formData.password
          }
        }
      })

      this.props.history.push('/login')
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
              <Logo className={classes.logo} linkTo='/login' />
              <Typography variant='h5' className={classes.title}>Change password</Typography>
              <Form
                onSubmit={this.changePassword}
                validate={validate}
                render={({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <Field
                      id={models.players.fields.password}
                      name={models.players.fields.password}
                      component={FormTextField}
                      label='New password'
                      type='password'
                      disabled={this.state.processing}
                      className={classes.input}
                      required
                    />
                    <Field
                      id='repeatPassword'
                      name='repeatPassword'
                      component={FormTextField}
                      label='Repeat password'
                      type='password'
                      disabled={this.state.processing}
                      className={classes.lastInput}
                      required
                    />
                    <div className={classes.divider} />
                    <Button
                      type='submit'
                      variant='contained'
                      color='primary'
                      disabled={this.state.processing}
                      className={classes.button}
                    >
                      <div className={classes.loadingBar}>
                        {
                          this.state.processing && <CircularProgress size={17} thickness={2} />
                        }
                      </div>
                      Set new password
                    </Button>
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

PasswordRecovery.propTypes = {
  classes: PropTypes.object,
  handleSubmit: PropTypes.func
}

const enhance = compose(
  withRouter,
  withStyles(styles, { withTheme: true }),
  connect(null, { showNotification })
)

export default enhance(PasswordRecovery)
