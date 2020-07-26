import React, { useEffect, useState } from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import { makeStyles } from '@material-ui/core/styles'
import { GET_LIST, UPDATE, UPDATE_MANY, useDataProvider } from 'react-admin'
import { constants, models } from 'stf-core'
import { getPlayerId } from '../../utils/getPlayerId'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import { useHistory } from 'react-router-dom'
import { Divider, Typography } from '@material-ui/core'
import DotIcon from '@material-ui/icons/FiberManualRecord'
import { Parser as HtmlToReactParser } from 'html-to-react'
import NavigateToIcon from '@material-ui/icons/OpenInBrowser'
import MarkIcon from '@material-ui/icons/EmojiFlags'

const useStyles = makeStyles((theme) => ({
  notificationCard: {
    marginRight: theme.spacing(2),
    minWidth: 400,
    maxWidth: 600
  },
  invitationMenuItem: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  actionMenuItem: {
    display: 'flex',
    justifyContent: 'center'
  },
  actionContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '10px 0'
  },
  emptyNotifications: {
    margin: '10px 0',
    color: theme.palette.text.disabled
  }
}))

export default function NotificationsMenu () {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
  const [notifications, setNotifications] = useState([])
  const dataProvider = useDataProvider()
  const history = useHistory()
  const htmlToReactParser = new HtmlToReactParser()

  const parseToHtml = str => htmlToReactParser.parse(str)

  useEffect(() => {
    const req = async () => {
      setNotifications(
        (await dataProvider(GET_LIST, constants.resources.notifications, {
          filter: {
            [models.notifications.fields.player]: getPlayerId(),
            [models.notifications.fields.isOpen]: false
          }
        })).data
      )
    }
    req()
  }, [open])

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown (event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])

  const onClickInvitation = async (event, notification) => {
    await dataProvider(UPDATE, constants.resources.notifications, {
      id: notification._id,
      data: {
        [models.notifications.fields.isOpen]: true
      }
    })
    history.push(notification[models.notifications.fields.link])
    handleClose(event)
  }

  const moveToNotificationPanel = (event) => {
    history.push('/notifications')
    handleClose(event)
  }

  const markAll = event => {
    const ids = notifications.map(notification => {
      if (!notification[models.notifications.fields.isOpen]) {
        return notification._id
      }
    })

    dataProvider(UPDATE_MANY, constants.resources.notifications, {
      ids,
      data: { [models.notifications.fields.isOpen]: true }
    })

    handleClose(event)
  }

  // TODO: Rename
  // TODO: Extract unify notify item
  // TODO: Add filed toArchive
  // TODO: Archive elements which is toArchive and on the list
  const NotificationItem = () => {
    if (notifications.length === 0) {
      return (
        <Typography align='center' className={classes.emptyNotifications}>You dont have any notification</Typography>
      )
    }
    return notifications.map((notification, index) => {
      if (notification[models.notifications.fields.type] === constants.notificationType.invitation) {
        return (
          <MenuItem
            key={index}
            className={classes.invitationMenuItem}
            onClick={(e) => onClickInvitation(e, notification)}
          >
            <DotIcon style={{ fontSize: 10 }} color='primary' />
            {parseToHtml(notification[models.notifications.fields.message])}
          </MenuItem>
        )
      }

      return <MenuItem key={index} onClick={handleClose}>{notification[models.notifications.fields.message]}</MenuItem>
    }
    )
  }

  return (
    <>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup='true'
        onClick={handleToggle}
        color='inherit'
      >
        <Badge badgeContent={notifications.length} color='secondary'>
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper className={classes.notificationCard}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id='menu-list-grow' onKeyDown={handleListKeyDown}>
                  <Typography color='primary' variant='h5' align='center' gutterBottom>Notifications</Typography>
                  <Divider />
                  <NotificationItem />
                  <Divider />
                  <div className={classes.actionContainer}>
                    <MenuItem className={classes.actionMenuItem} onClick={moveToNotificationPanel}>
                      <NavigateToIcon />&nbsp;Notifications panel
                    </MenuItem>
                    {notifications.length !== 0 &&
                      <MenuItem className={classes.actionMenuItem} onClick={markAll}>
                        <MarkIcon />&nbsp;Mark all as seen
                      </MenuItem>}
                  </div>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}
