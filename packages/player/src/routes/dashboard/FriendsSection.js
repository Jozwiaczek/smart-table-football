import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import { Button, Divider, Typography } from '@material-ui/core';
import CustomerIcon from '@material-ui/icons/PersonAdd';
import InviteFirendsIcon from '@material-ui/icons/GroupAdd';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate } from 'react-admin';

import CardIcon from './CardIcon';
import InviteFriendModal from './InviteFriendModal';

const useStyles = makeStyles({
  main: {
    flex: '1',
    marginTop: 20,
    marginBottom: 30,
    width: '80%',
  },
  card: {
    padding: '16px 0',
    overflow: 'inherit',
    textAlign: 'right',
  },
  title: {
    padding: '0 16px',
  },
  value: {
    padding: '0 16px',
    minHeight: 48,
  },
  addFriendBtn: {
    marginTop: '1em',
  },
  addFriendBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const FriendsSection = ({ teamsNumber }) => {
  const classes = useStyles();
  const translate = useTranslate();
  const [isInviteFriendModalOpen, setInviteFriendModalOpen] = useState(false);

  return (
    <div className={classes.main}>
      <CardIcon Icon={CustomerIcon} bgColor="#FF9800" />
      <Card className={classes.card}>
        <Typography className={classes.title} color="textSecondary">
          {translate('pos.dashboard.teamsSection.title')}
        </Typography>
        <Typography variant="h5" component="h2" className={classes.value}>
          {teamsNumber}
        </Typography>
        <Divider />
        <div className={classes.addFriendBtnContainer}>
          <Button
            color="primary"
            variant="contained"
            className={classes.addFriendBtn}
            onClick={() => setInviteFriendModalOpen(true)}
          >
            <InviteFirendsIcon />
            &nbsp;{translate('pos.dashboard.teamsSection.button')}
          </Button>
        </div>
      </Card>
      <InviteFriendModal
        isOpen={isInviteFriendModalOpen}
        onClose={() => setInviteFriendModalOpen(false)}
      />
    </div>
  );
};

export default FriendsSection;
