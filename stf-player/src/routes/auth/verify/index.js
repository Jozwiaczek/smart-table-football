import React, { Component } from 'react'
import { connect } from 'react-redux'
import compose from 'recompose/compose'

import { Button, Card, Typography } from '@material-ui/core'

import { Link, CREATE } from 'react-admin'

import { MuiThemeProvider, withStyles } from '@material-ui/core/styles'

import PropTypes from 'prop-types'
import { themeProvider } from '../../../themes'

import dataProvider from '../../../dataProvider'

import { constants } from 'stf-core'

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto'
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
  avatar: {
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'center'
  },
  title: {
    margin: '2rem 0 1rem 0'
  },
  logo: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    margin: '2rem 0 0.5rem 0',
    width: '100%'
  }
}

class Verify extends Component {
  constructor (props) {
    super(props)
    this.state = {
      theme: null,
      success: false,
      verifying: true
    }

    this._renderMessage = this._renderMessage.bind(this)
  }

  async componentDidMount () {
    this.setState({ theme: await themeProvider() })

    const params = new URLSearchParams(this.props.location.search)
    const token = params.get('token')

    try {
      await dataProvider(CREATE, constants.resources.playerAuthManagement, {
        data: {
          action: 'verifySignupLong',
          value: token
        }
      })

      this.setState({
        success: true,
        verifying: false
      })
    } catch (e) {
      console.error(e)
      this.setState({
        success: false,
        verifying: false
      })
    }
  }

  _renderMessage (classes) {
    if (this.state.verifying) {
      return (
        <Typography variant='h6' className={classes.title} align='center'>Loading</Typography>
      )
    }
    if (this.state.success) {
      return (
        <Typography variant='h6' className={classes.title} align='center'>Verification Successful</Typography>
      )
    }
    return (
      <Typography variant='h6' className={classes.title} align='center'>Verification Failed</Typography>
    )
  }

  render () {
    const { classes } = this.props

    if (!this.state.theme) {
      return null
    }

    return (
      <MuiThemeProvider theme={this.state.theme}>
        <div className={classes.main} style={{ backgroundColor: this.state.theme.palette.background.default }}>
          <Card className={classes.card}>
            <div className={classes.avatar}>
              <Typography variant='h2' align='center' className={classes.logo}>
                Smart Table Football
              </Typography>
            </div>
            {this._renderMessage(classes)}
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
              component={Link}
              to='/login'
            >
              Back to app
            </Button>
          </Card>
        </div>
      </MuiThemeProvider>
    )
  }
}

Verify.propTypes = {
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
  dataProvider: PropTypes.func,
  userLogin: PropTypes.func,
  isLoading: PropTypes.bool
}

const mapStateToProps = state => ({ isLoading: state.admin.loading > 0 })

const enhance = compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps)
)

export default enhance(Verify)
