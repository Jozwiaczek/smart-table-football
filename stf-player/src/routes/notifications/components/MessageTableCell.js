import React from 'react'
import PropTypes from 'prop-types'
import { Parser as HtmlToReactParser } from 'html-to-react'

import { makeStyles } from '@material-ui/core/styles'
import { TableCell, Typography } from '@material-ui/core'
import DotIcon from '@material-ui/icons/FiberManualRecord'

import { models } from 'stf-core'

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
  const htmlToReactParser = new HtmlToReactParser()

  const parseToHtml = str => htmlToReactParser.parse(str)

  const message = <Typography>{parseToHtml(row[models.notifications.fields.message])}</Typography>
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
    <TableCell component='th' scope='row' padding='none'>
      {getContent()}
    </TableCell>
  )
}

MessageTableCell.propTypes = {
  row: PropTypes.object
}

export default MessageTableCell
