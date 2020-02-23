import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import {
  Notification
} from 'react-admin'
import {
  Card,
  Typography
} from '@material-ui/core'
import {
  createMuiTheme,
  withStyles,
  createStyles
} from '@material-ui/core/styles'

import DefaultLoginForm from './RegistrationForm'
import BackgroundGraphic from '../../../elements/BackgroundGraphic'
import { themeProvider } from '../../../themes'
import Ball from '../../../elements/Ball'

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

const sanitizeRestProps = ({
  array,
  backgroundImage,
  classes,
  className,
  location,
  staticContext,
  theme,
  title,
  ...rest
}) => rest

class Login extends Component {
  constructor (props) {
    super(props)
    this.theme = createMuiTheme(props.theme)
    this.containerRef = React.createRef()
  }

  render () {
    const { classes, className, loginForm, ...rest } = this.props

    return (
      <BackgroundGraphic
        graphic={<Ball />}
      >
        <div
          className={classnames(classes.main, className)}
          {...sanitizeRestProps(rest)}
          ref={this.containerRef}
        >
          <Card className={classes.card}>
            <Typography variant={'h2'} align={'center'} className={classes.logo}>
              Registration
            </Typography>
            {loginForm}
          </Card>
          <Notification />
        </div>
      </BackgroundGraphic>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  loginForm: PropTypes.element
}

Login.defaultProps = {
  theme: themeProvider(true),
  loginForm: <DefaultLoginForm />
}

export default withStyles(styles)(Login)
