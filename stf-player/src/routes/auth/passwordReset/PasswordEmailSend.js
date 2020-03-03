import React, { Component } from 'react'
import compose from 'recompose/compose'
import {
  Link,
  Notification
} from 'react-admin'

import {
  Button,
  Typography,
  MuiThemeProvider,
  Card,
  CardContent
} from '@material-ui/core'
import { withStyles, createStyles } from '@material-ui/core/styles'
import { themeProvider } from '../../../themes'
import Ball from '../../../elements/Ball'
import BackgroundGraphic from '../../../elements/BackgroundGraphic'

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
    marginBottom: '2rem'
  },
  button: {
    width: '100%'
  },
  text: {
    textAlign: 'center',
    marginBottom: '3rem'
  }
})

class PasswordEmailSend extends Component {
  constructor (props) {
    super(props)
    this.state = {
      theme: null
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
              <Typography variant='h2' align='center' className={classes.logo}>
                Smart Table Football
              </Typography>
              <Typography className={classes.text} variant='h5'>
              Email has been sent.<br />
              Please check your emails.
              </Typography>
              <Button
                type='submit'
                variant='contained'
                component={Link}
                to='/login'
                color='primary'
                className={classes.button}
              >
              Go to login page
              </Button>
            </CardContent>
          </Card>
          <Notification />
        </MuiThemeProvider>
      </BackgroundGraphic>
    )
  }
}

const enhance = compose(
  withStyles(styles)
)

export default enhance(PasswordEmailSend)
