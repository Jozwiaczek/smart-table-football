import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import { TableCell, Typography } from '@material-ui/core'
import DotIcon from '@material-ui/icons/FiberManualRecord'

import { constants, models } from 'stf-core'
import { useHistory } from 'react-router-dom'
import { UPDATE, useDataProvider } from 'react-admin'

const useStyles = makeStyles(() => ({
  newNotification: {
    display: 'flex',
    alignItems: 'center'
  },
  dotIcon: {
    marginRight: 10,
    fontSize: 12
  }
}))

const MessageTableCell = ({ row }) => {
  const classes = useStyles()
  const dataProvider = useDataProvider()
  const history = useHistory()

  const onClick = async () => {
    await dataProvider(UPDATE, constants.resources.notifications, {
      id: row._id,
      data: {
        [models.notifications.fields.isOpen]: true
      }
    })
    const link = row[models.notifications.fields.link]
    link && history.push(link)
  }

  const message = <Typography>{row[models.notifications.fields.message]}</Typography>
  const getContent = () => {
    if (row[models.notifications.fields.isOpen]) {
      return message
    } else {
      return (
        <div className={classes.newNotification}>
          <DotIcon className={classes.dotIcon} color='primary' />
          {message}
        </div>
      )
    }
  }

  return (
    <TableCell component='th' scope='row' padding='none' onClick={onClick}>
      {getContent()}
    </TableCell>
  )
}

MessageTableCell.propTypes = {
  row: PropTypes.object
}

export default MessageTableCell
