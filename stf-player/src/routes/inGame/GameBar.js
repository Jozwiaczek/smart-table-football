import React from 'react'
import PropTypes from 'prop-types'
import { Button, makeStyles } from '@material-ui/core'
import FullscreenIcon from '@material-ui/icons/Fullscreen'
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const useStyles = makeStyles(() => ({
  navBar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1em'
  },
  icon: {
    fontSize: 60
  }
}))

const GameBar = ({
  finishMatch,
  setFullScreen,
  isFullScreen
}) => {
  const classes = useStyles()

  return (
    <div className={classes.navBar}>
      <Button color='primary' onClick={() => finishMatch()}>
        <ArrowBackIcon className={classes.icon} />
      </Button>

      <Button color='primary' onClick={() => setFullScreen(prevState => !prevState)}>
        {isFullScreen ? <FullscreenExitIcon className={classes.icon} /> : <FullscreenIcon className={classes.icon} />}
      </Button>
    </div>
  )
}

GameBar.propTypes = {
  finishMatch: PropTypes.func.isRequired,
  isFullScreen: PropTypes.bool.isRequired,
  setFullScreen: PropTypes.func.isRequired
}

export default GameBar
