import PropTypes from 'prop-types';
import { makeStyles, Typography } from '@material-ui/core';
import { constants, models } from 'stf-core';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { UPDATE, useDataProvider, useTranslate } from 'react-admin';
import { useHistory } from 'react-router-dom';
import InvitationIcon from '@material-ui/icons/GroupAdd';

const useStyles = makeStyles((theme) => ({
  emptyNotifications: {
    margin: '10px 0',
    color: theme.palette.text.disabled,
  },
  invitationMenuItem: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const NotificationMenuItem = ({ notifications, closeNotificationPanel }) => {
  const classes = useStyles();
  const dataProvider = useDataProvider();
  const history = useHistory();
  const translate = useTranslate();

  const onClickInvitation = async (event, notification) => {
    await dataProvider(UPDATE, constants.resources.notifications, {
      id: notification._id,
      data: {
        [models.notifications.fields.isOpen]: true,
      },
    });
    history.push(notification[models.notifications.fields.link]);
    closeNotificationPanel(event);
  };

  if (notifications.length === 0) {
    return (
      <Typography align="center" className={classes.emptyNotifications}>
        {translate('layout.appBar.notifications.emptyList')}
      </Typography>
    );
  }

  const Item = ({ notification, children }) => (
    <MenuItem
      className={classes.invitationMenuItem}
      onClick={(e) => onClickInvitation(e, notification)}
    >
      {children}
    </MenuItem>
  );

  return notifications.map((notification, index) => {
    if (!notification[models.notifications.fields.isOpen]) {
      switch (notification[models.notifications.fields.type]) {
        case constants.notificationType.invitation:
          return (
            <Item key={index} notification={notification}>
              <InvitationIcon color="primary" />
              {notification[models.notifications.fields.message]}
            </Item>
          );
        default:
          return (
            <Item key={index} notification={notification}>
              {notification[models.notifications.fields.message]}
            </Item>
          );
      }
    }
    return null;
  });
};

NotificationMenuItem.propTypes = {
  closeNotificationPanel: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
};

export default NotificationMenuItem;
