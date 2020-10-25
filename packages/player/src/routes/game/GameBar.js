import React from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles, Typography } from '@material-ui/core';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
  navBar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1em',
  },
  backIcon: {
    fontSize: 60,
  },
  title: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'inline',
    },
  },
  fullScreenIcon: {
    fontSize: 60,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

const GameBar = ({ finishMatch, setFullScreen, isFullScreen }) => {
  const classes = useStyles();

  return (
    <div className={classes.navBar}>
      <Button color="primary" onClick={() => finishMatch()}>
        <ArrowBackIcon className={classes.backIcon} />
      </Button>

      <Typography variant="h2" align="center" color="textSecondary" className={classes.title}>
        Match
      </Typography>

      <Button color="primary" onClick={() => setFullScreen((prevState) => !prevState)}>
        {isFullScreen ? (
          <FullscreenExitIcon className={classes.fullScreenIcon} />
        ) : (
          <FullscreenIcon className={classes.fullScreenIcon} />
        )}
      </Button>
    </div>
  );
};

GameBar.propTypes = {
  finishMatch: PropTypes.func.isRequired,
  isFullScreen: PropTypes.bool.isRequired,
  setFullScreen: PropTypes.func.isRequired,
};

export default GameBar;
