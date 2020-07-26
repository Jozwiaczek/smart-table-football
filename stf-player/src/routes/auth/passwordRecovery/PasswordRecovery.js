import React, { useState } from 'react'
import { withRouter } from 'react-router'
import { Field, Form } from 'react-final-form'
import compose from 'recompose/compose'
import FormTextField from '../../../elements/forms/FormTextField'

import { Button, Card, CardContent, CircularProgress, Typography } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import red from '@material-ui/core/colors/red'

import dataProvider from '../../../dataProvider'

import { constants, models } from 'stf-core'
import PropTypes from 'prop-types'
import BackgroundGraphic from '../../../elements/BackgroundGraphic'
import { Notification, useNotify, useTranslate } from 'react-admin'
import Logo from '../../../elements/Logo'
import { validatePasswordRecovery } from '../validate'
import ThemeWrapper from '../../../elements/ThemeWrapper'

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
}))

const PasswordRecovery = ({ location, history }) => {
  const [processing, setProcessing] = useState(false)

  const classes = useStyles()
  const notify = useNotify()
  const translate = useTranslate()

  const changePassword = async formData => {
    try {
      setProcessing(true)
      const token = new URLSearchParams(location.search).get('reset_token')

      await dataProvider('CREATE', constants.resources.playerAuthManagement, {
        data: {
          action: 'resetPwdLong',
          value: {
            token,
            password: formData.password
          }
        }
      })

      history.push('/login')
    } catch (e) {
      setProcessing(false)
      await notify(e.message, 'warning')
    }
  }

  return (
    <ThemeWrapper>
      <BackgroundGraphic className={classes.main}>
        <Card className={classes.card}>
          <CardContent>
            <Logo className={classes.logo} linkTo='/login' />
            <Typography variant='h5' className={classes.title}>Change password</Typography>
            <Form
              onSubmit={changePassword}
              validate={values => validatePasswordRecovery(values, translate)}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Field
                    id={models.players.fields.password}
                    name={models.players.fields.password}
                    component={FormTextField}
                    label='New password'
                    type='password'
                    disabled={processing}
                    className={classes.input}
                    required
                  />
                  <Field
                    id='repeatPassword'
                    name='repeatPassword'
                    component={FormTextField}
                    label='Repeat password'
                    type='password'
                    disabled={processing}
                    className={classes.lastInput}
                    required
                  />
                  <div className={classes.divider} />
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    disabled={processing}
                    className={classes.button}
                  >
                    <div className={classes.loadingBar}>
                      {
                        processing && <CircularProgress size={17} thickness={2} />
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
      </BackgroundGraphic>
    </ThemeWrapper>
  )
}

PasswordRecovery.propTypes = {
  classes: PropTypes.object,
  handleSubmit: PropTypes.func
}

const enhance = compose(
  withRouter
)

export default enhance(PasswordRecovery)
