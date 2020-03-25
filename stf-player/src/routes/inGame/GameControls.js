import React from 'react'
import PropTypes from 'prop-types'

import { Button, makeStyles } from '@material-ui/core'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'

import Timer from './Timer'
import { constants } from 'stf-core'

const useStyles = makeStyles(() => ({
  controlsSection: {
    display: 'flex',
    flexDirection: 'column'
  }
}))

const GameControls = ({
  elapsedTimer,
  status,
  changeStatus,
  finishMatch
}) => {
  const classes = useStyles()

  return (
    <div className={classes.controlsSection}>
      <Timer time={elapsedTimer} />
      <Button variant='outlined' color='secondary' onClick={() => changeStatus()}>
        {status !== constants.statusMatch.active ? <><PlayArrowIcon />&nbsp;Start match</> : <><PauseIcon />&nbsp;Pause match</>}
      </Button>
      <Button variant='contained' color='secondary' onClick={() => finishMatch()}>
        Finish match
      </Button>
    </div>
  )
}

GameControls.propTypes = {
  changeStatus: PropTypes.func.isRequired,
  elapsedTimer: PropTypes.number.isRequired,
  finishMatch: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired
}

export default GameControls
