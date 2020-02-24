import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Typography,
  withStyles,
  Backdrop,
  Fade,
  LinearProgress,
  CircularProgress,
  Dialog,
  Slide
} from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel'

import { models } from 'stf-core'

const styles = () => ({
  button: {
    margin: '2rem 0 0.5rem 0',
    width: '100%'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: '#FFF',
    padding: '2em'
  },
  newGoalAlertContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  hide: {
    display: 'none'
  },
  loadingAnimation: {
    height: '240px',
    width: '320px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const GoalDetailsModal = ({
  classes,
  goal,
  getTeamName,
  removeGoal,
  isAlertOpen,
  completedCountdown,
  closeAlertNewGoal
}) => {
  const [isReplayLoading, setReplayLoading] = useState(false)

  if (!goal) return null

  const replayId = goal[models.goals.fields.replay]
  const teamName = getTeamName(goal[models.goals.fields.team])

  return (
    <Dialog
      className={classes.modal}
      open={isAlertOpen}
      onClose={closeAlertNewGoal}
      TransitionComponent={Transition}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={isAlertOpen}>
        <div className={classes.paper}>
          <Typography variant={'h2'} align={'center'}>GOAL!</Typography>
          <div className={classes.newGoalAlertContent}>
            <Typography variant={'h5'} gutterBottom>
              Team: {teamName}
            </Typography>
            {
              replayId &&
                <div>
                  <video
                    height='240'
                    width='320' // 640 480
                    autoPlay
                    loop
                    className={isReplayLoading ? classes.hide : null}
                    onLoadStart={() => setReplayLoading(true)}
                    onLoadedData={() => setReplayLoading(false)}
                  >
                    <source src={`https://drive.google.com/uc?id=${replayId}&export=download`} type='video/mp4' />
                  </video>
                  {
                    isReplayLoading &&
                      <div className={classes.loadingAnimation}>
                        <CircularProgress size={100} />
                      </div>
                  }
                </div>
            }
            {
              completedCountdown === 0 ? null
                : <Button
                  variant={'contained'}
                  color={'secondary'}
                  onClick={async () => {
                    await removeGoal(goal)
                    closeAlertNewGoal()
                  }}
                >
                  <CancelIcon />&nbsp;
                Cancel goal
                </Button>
            }
            {
              completedCountdown === 0 ? null
                : <LinearProgress
                  style={{ width: '100%', marginTop: '1em' }}
                  variant='determinate'
                  value={completedCountdown}
                />
            }
          </div>
        </div>
      </Fade>
    </Dialog>
  )
}

GoalDetailsModal.propTypes = {
  classes: PropTypes.object,
  closeAlertNewGoal: PropTypes.func.isRequired,
  completedCountdown: PropTypes.number.isRequired,
  getTeamName: PropTypes.func.isRequired,
  isAlertOpen: PropTypes.bool.isRequired,
  newGoal: PropTypes.object,
  removeGoal: PropTypes.func.isRequired
}

export default withStyles(styles)(GoalDetailsModal)
