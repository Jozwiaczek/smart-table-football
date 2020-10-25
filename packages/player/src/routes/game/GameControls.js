import React from 'react';
import PropTypes from 'prop-types';

import { Button, makeStyles } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

import { constants } from 'stf-core';

import Timer from './Timer';

const useStyles = makeStyles((theme) => ({
  controlsSection: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      margin: '3em 0',
    },
  },
  matchStateButton: {
    borderRadius: '10px 10px 0 0',
    height: 50,
    marginTop: 25,
  },
  finishButton: {
    borderRadius: '0 0 10px 10px',
    height: 50,
  },
}));

const GameControls = ({ elapsedTimer, status, changeStatus, finishMatch, startButtonDisabled }) => {
  const classes = useStyles();

  return (
    <div className={classes.controlsSection}>
      <Timer time={elapsedTimer} />
      <Button
        variant="outlined"
        color="primary"
        disabled={startButtonDisabled}
        className={classes.matchStateButton}
        onClick={() => changeStatus()}
      >
        {status !== constants.statusMatch.active ? (
          <>
            <PlayArrowIcon />
            &nbsp;Start match
          </>
        ) : (
          <>
            <PauseIcon />
            &nbsp;Pause match
          </>
        )}
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.finishButton}
        onClick={() => finishMatch()}
      >
        Finish match
      </Button>
    </div>
  );
};

GameControls.propTypes = {
  changeStatus: PropTypes.func.isRequired,
  elapsedTimer: PropTypes.number.isRequired,
  finishMatch: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  startButtonDisabled: PropTypes.bool,
};

export default GameControls;
