import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import ThumbUp from '@material-ui/icons/ThumbUp'
import ThumbDown from '@material-ui/icons/ThumbDown'
import { startUndoable, crudUpdate } from 'ra-core'

const styles = {
  approved: {
    color: 'green'
  },
  rejected: {
    color: 'red'
  },
  approveButtonWithLabel: {
    marginTop: 16
  }
}

class ApproveButton extends Component {
  constructor (props) {
    super(props)

    this._handleApprove = this._handleApprove.bind(this)
    this._handleReject = this._handleReject.bind(this)
  }

  _handleApprove (e) {
    e.stopPropagation()
    const {
      record,
      resource,
      basePath
    } = this.props
    this.props.startUndoable(
      crudUpdate(resource, record._id, { ...record, status: 'approved' }, record, basePath, false)
    )
  }

  _handleReject (e) {
    e.stopPropagation()
    const {
      record,
      resource,
      basePath
    } = this.props
    this.props.startUndoable(
      crudUpdate(resource, record._id, { ...record, status: 'rejected' }, record, basePath, false)
    )
  }

  render () {
    const { record, classes, label } = this.props
    return (
      <div className={label && classes.approveButtonWithLabel}>
        {
          label &&
            <Typography variant='caption'>
              {label}
            </Typography>
        }
        <IconButton
          onClick={this._handleApprove}
          disabled={record.status === 'approved'}
        >
          <ThumbUp
            className={
              record.status === 'approved' ? classes.approved : ''
            }
          />
        </IconButton>
        <IconButton
          onClick={this._handleReject}
          disabled={record.status === 'rejected'}
        >
          <ThumbDown
            className={
              record.status === 'rejected' ? classes.rejected : ''
            }
          />
        </IconButton>
      </div>
    )
  }
}

ApproveButton.propTypes = {
  classes: PropTypes.object,
  record: PropTypes.object,
  reviewApprove: PropTypes.func,
  reviewReject: PropTypes.func
}

export default connect(undefined, {
  startUndoable
})(withStyles(styles)(ApproveButton))
