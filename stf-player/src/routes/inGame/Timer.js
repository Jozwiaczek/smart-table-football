import PropTypes from 'prop-types'
import React from 'react'

import { Typography, withStyles } from '@material-ui/core'

import { getTimerUnit } from '../../utils/getTimerUnits'

const styles = () => ({
  title: {
    marginBottom: '1rem'
  }
})

const Timer = ({ time, classes }) => {
  return (
    <Typography className={classes.title} variant='h3' color='secondary' align='center'>
      {
        getTimerUnit(time).min === '00' ? `${getTimerUnit(time).sec} seconds`
          : `${getTimerUnit(time).min}min : ${getTimerUnit(time).sec}sec`
      }
    </Typography>
  )
}

Timer.propTypes = {
  classes: PropTypes.object,
  time: PropTypes.number.isRequired
}

export default withStyles(styles)(Timer)
