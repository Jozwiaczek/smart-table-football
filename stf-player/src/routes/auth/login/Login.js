import React, { createRef } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Notification } from 'react-admin'
import { Card } from '@material-ui/core'
import { createStyles, withStyles } from '@material-ui/core/styles'

import DefaultLoginForm from './LoginForm'
import BackgroundGraphic from '../../../elements/BackgroundGraphic'
import Logo from '../../../elements/Logo'
import ThemeWrapper from '../../../elements/ThemeWrapper'

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

const Login = ({ classes, className, loginForm }) => {
  const containerRef = createRef()
  return (
    <ThemeWrapper>
      <BackgroundGraphic>
        <div className={classnames(classes.main, className)} ref={containerRef}>
          <Card className={classes.card}>
            <Logo className={classes.logo} />
            {loginForm}
          </Card>
          <Notification />
        </div>
      </BackgroundGraphic>
    </ThemeWrapper>
  )
}

Login.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  loginForm: PropTypes.element
}

Login.defaultProps = {
  loginForm: <DefaultLoginForm />
}

export default withStyles(styles)(Login)
