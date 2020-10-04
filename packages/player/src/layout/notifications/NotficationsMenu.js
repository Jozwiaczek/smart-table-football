import React, { useEffect, useState } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { GET_LIST, UPDATE_MANY, useDataProvider } from 'react-admin';
import { constants, models } from 'stf-core';

import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';
import { Divider, Typography } from '@material-ui/core';
import NavigateToIcon from '@material-ui/icons/OpenInBrowser';
import MarkIcon from '@material-ui/icons/EmojiFlags';

import { getPlayerId } from '../../utils/getPlayerId';
import NotificationMenuItem from './NotificationMenuItem';

const useStyles = makeStyles((theme) => ({
  notificationCard: {
    marginRight: theme.spacing(2),
    minWidth: 300,
    maxWidth: 400,
  },
  actionMenuItem: {
    display: 'flex',
    justifyContent: 'center',
  },
  actionContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '10px 0',
  },
}));

export default function NotificationsMenu() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [notifications, setNotifications] = useState([]);
  const dataProvider = useDataProvider();
  const history = useHistory();

  useEffect(() => {
    const req = async () => {
      setNotifications(
        (
          await dataProvider(GET_LIST, constants.resources.notifications, {
            filter: {
              [models.notifications.fields.player]: getPlayerId(),
              [models.notifications.fields.isOpen]: false,
            },
          })
        ).data,
      );
    };
    req();
  }, [open, dataProvider]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const moveToNotificationPanel = (event) => {
    history.push('/notifications');
    handleClose(event);
  };

  const markAll = (event) => {
    const ids = notifications.map((notification) => {
      if (!notification[models.notifications.fields.isOpen]) {
        return notification._id;
      }
      return null;
    });

    dataProvider(UPDATE_MANY, constants.resources.notifications, {
      ids,
      data: { [models.notifications.fields.isOpen]: true },
    });

    handleClose(event);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        color="inherit"
        onClick={handleToggle}
      >
        <Badge badgeContent={notifications.length} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popper transition disablePortal open={open} anchorEl={anchorRef.current} role={undefined}>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper className={classes.notificationCard}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <Typography gutterBottom color="primary" variant="h5" align="center">
                    Notifications
                  </Typography>
                  <Divider />
                  <NotificationMenuItem
                    notifications={notifications}
                    closeNotificationPanel={handleClose}
                  />
                  <Divider />
                  <div className={classes.actionContainer}>
                    <MenuItem className={classes.actionMenuItem} onClick={moveToNotificationPanel}>
                      <NavigateToIcon />
                      &nbsp;Notifications panel
                    </MenuItem>
                    {notifications.length !== 0 && (
                      <MenuItem className={classes.actionMenuItem} onClick={markAll}>
                        <MarkIcon />
                        &nbsp;Mark all as seen
                      </MenuItem>
                    )}
                  </div>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
