import React from 'react'
import Card from '@material-ui/core/Card'
import { Button, Divider, Typography } from '@material-ui/core'
import CustomerIcon from '@material-ui/icons/PersonAdd'
import InviteFirendsIcon from '@material-ui/icons/GroupAdd'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslate } from 'react-admin'

import CardIcon from './CardIcon'

const useStyles = makeStyles({
  main: {
    flex: '1',
    marginLeft: '1em',
    marginTop: 20,
    width: '60%'
  },
  card: {
    padding: '16px 0',
    overflow: 'inherit',
    textAlign: 'right'
  },
  title: {
    padding: '0 16px'
  },
  value: {
    padding: '0 16px',
    minHeight: 48
  },
  addFriendBtn: {
    marginTop: '1em'
  },
  addFriendBtnContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
})

const FriendsSection = () => {
  const classes = useStyles()
  const translate = useTranslate()

  return (
    <div className={classes.main}>
      <CardIcon Icon={CustomerIcon} bgColor='#FF9800' />
      <Card className={classes.card}>
        <Typography className={classes.title} color='textSecondary'>
          {translate('pos.dashboard.friendsSection.title')}
        </Typography>
        <Typography
          variant='h5'
          component='h2'
          className={classes.value}
        >
          {0}
        </Typography>
        <Divider />
        {/* <List> */}
        {/*  {visitors */}
        {/*    ? visitors.map((record) => ( */}
        {/*      <ListItem */}
        {/*        button */}
        {/*        to={`/customers/${record.id}`} */}
        {/*        component={Link} */}
        {/*        key={record.id} */}
        {/*      > */}
        {/*        <ListItemAvatar> */}
        {/*          <Avatar */}
        {/*            src={`${record.avatar}?size=32x32`} */}
        {/*          /> */}
        {/*        </ListItemAvatar> */}
        {/*        <ListItemText */}
        {/*          primary={`${record.first_name} ${ */}
        {/*            record.last_name */}
        {/*          }`} */}
        {/*        /> */}
        {/*      </ListItem> */}
        {/*    )) */}
        {/*    : null} */}
        {/* </List> */}
        <div className={classes.addFriendBtnContainer}>
          <Button color='primary' variant='contained' className={classes.addFriendBtn} onClick={() => console.log('Invite friend btn clicked')}>
            <InviteFirendsIcon />&nbsp;
            Invite friend
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default FriendsSection
