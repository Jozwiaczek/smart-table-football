import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Notification } from 'react-admin'
import { Card } from '@material-ui/core'
import { createStyles, withStyles } from '@material-ui/core/styles'

import DefaultLoginForm from './RegistrationForm'
import BackgroundGraphic from '../../../elements/BackgroundGraphic'
import Ball from '../../../elements/Ball'
import Logo from '../../../elements/Logo'

const styles = () => createStyles({
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
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'center'
  }
})

const Registration = ({ classes, className, loginForm }) => (
  <BackgroundGraphic graphic={<Ball />}>
    <div className={classnames(classes.main, className)}>
      <Card className={classes.card}>
        <Logo linkTo='/login' className={classes.logo} />
        {loginForm}
      </Card>
      <Notification />
    </div>
  </BackgroundGraphic>
)

Registration.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  loginForm: PropTypes.element
}

Registration.defaultProps = {
  loginForm: <DefaultLoginForm />
}

export default withStyles(styles)(Registration)
