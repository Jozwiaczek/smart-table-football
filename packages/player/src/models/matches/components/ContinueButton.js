import React from 'react';
import { Button } from '@material-ui/core';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import { constants, models } from 'stf-core';
import SlowMotionVideoIcon from '@material-ui/icons/SlowMotionVideo';

const ContinueButton = ({ classes, record, history, mobile, disabled, isInGame }) => {
  if (!record) return null;

  if (isInGame === record.id) {
    return (
      <Button
        color="action"
        disabled={disabled}
        onClick={() => history.push({ pathname: '/inGame', search: `?match=${record._id}` })}
      >
        <EmojiPeopleIcon className={classes.buttonIcon} color="action" />
        {mobile ? null : 'Join'}
      </Button>
    );
  }

  if (
    record[models.matches.fields.status] === constants.statusMatch.paused ||
    record[models.matches.fields.status] === constants.statusMatch.await
  ) {
    return (
      <Button
        color="primary"
        disabled={disabled || isInGame}
        onClick={() => history.push({ pathname: '/inGame', search: `?match=${record._id}` })}
      >
        <SlowMotionVideoIcon className={classes.buttonIcon} />
        {mobile ? null : 'Resume'}
      </Button>
    );
  }
  return null;
};

export default ContinueButton;
