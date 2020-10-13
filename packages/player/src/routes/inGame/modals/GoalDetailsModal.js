import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  CircularProgress,
  LinearProgress,
  Typography,
  withStyles,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

import { models } from 'stf-core';

import Modal from '../../../elements/Modal';

const styles = () => ({
  button: {
    margin: '2rem 0 0.5rem 0',
    width: '100%',
  },
  hide: {
    display: 'none',
  },
  newGoalAlertContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  loadingAnimation: {
    height: '240px',
    width: '320px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Progress = ({ completedCountdown, removeGoal, goal, onClose }) => {
  if (completedCountdown === 0) {
    return (
      <>
        <Button
          variant="contained"
          color="secondary"
          onClick={async () => {
            await removeGoal(goal);
            onClose();
          }}
        >
          <CancelIcon />
          &nbsp; Cancel goal
        </Button>
        <LinearProgress
          style={{ width: '100%', marginTop: '1em' }}
          variant="determinate"
          value={completedCountdown}
        />
      </>
    );
  }
  return null;
};

const GoalDetailsModal = ({
  classes,
  goal,
  getTeamName,
  removeGoal,
  isOpen,
  completedCountdown,
  onClose,
}) => {
  const [isReplayLoading, setReplayLoading] = useState(false);

  if (!goal) return null;

  const replayId = goal[models.goals.fields.replay];
  const teamName = getTeamName(goal[models.goals.fields.team]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Typography variant="h2" component="h2" align="center" color="colorTextPrimary">
        GOAL!
      </Typography>
      <div className={classes.newGoalAlertContent}>
        <Typography gutterBottom variant="h5" component="h5" color="colorTextPrimary">
          Team: {teamName}
        </Typography>
        {replayId && (
          <div>
            <video
              autoPlay // 480
              loop // 640
              height="240"
              width="320"
              className={isReplayLoading ? classes.hide : null}
              onLoadStart={() => setReplayLoading(true)}
              onLoadedData={() => setReplayLoading(false)}
            >
              <source
                src={`https://drive.google.com/uc?id=${replayId}&export=download`}
                type="video/mp4"
              />
            </video>
            {isReplayLoading && (
              <div className={classes.loadingAnimation}>
                <CircularProgress size={100} />
              </div>
            )}
          </div>
        )}
        <Progress
          goal={goal}
          removeGoal={removeGoal}
          completedCountdown={completedCountdown}
          onClose={onClose}
        />
      </div>
    </Modal>
  );
};

GoalDetailsModal.propTypes = {
  classes: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  completedCountdown: PropTypes.number.isRequired,
  getTeamName: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  removeGoal: PropTypes.func.isRequired,
};

export default withStyles(styles)(GoalDetailsModal);
