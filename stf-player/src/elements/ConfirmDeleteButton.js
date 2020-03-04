import React, { Component } from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { fade } from '@material-ui/core/styles/colorManipulator'
import classNames from 'classnames'

import {
  Confirm
} from 'react-admin'
import ActionDelete from '@material-ui/icons/Delete'

import {
  withStyles,
  Button
} from '@material-ui/core'

const styles = (theme) => ({
  deleteButtonContained: {
    color: '#fff',
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark
    }
  },
  deleteButton: {
    color: theme.palette.error.main,
    '&:hover': {
      backgroundColor: fade(theme.palette.error.main, 0.12),
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }
  }
})

class ConfirmDeleteButton extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
    this.onClick = this.onClick.bind(this)
    this.onClose = this.onClose.bind(this)
  }
  onClick () {
    this.setState({ open: true })
  }
  onClose () {
    this.setState({ open: false })
  }
  render () {
    const {
      classes,
      title,
      content,
      confirm,
      cancel,
      label,
      onConfirm,
      record,
      history,
      variant,
      className,
      style
    } = this.props

    const { open } = this.state

    return (
      <>
        <Confirm
          key={`delete-modal-${record._id}`}
          isOpen={open}
          title={title}
          content={content}
          confirm={confirm}
          confirmColor='primary'
          cancel={cancel}
          onConfirm={() => {
            onConfirm(record, history)
            this.onClose()
          }}
          onClose={this.onClose}
        />
        <Button
          className={classNames(variant === 'contained' ? classes.deleteButtonContained : classes.deleteButton, className)}
          variant={variant}
          onClick={this.onClick}
          style={style}
        >
          <ActionDelete />&nbsp;{label}
        </Button>
      </>
    )
  }
}

ConfirmDeleteButton.propTypes = {
  classes: PropTypes.object,
  onConfirm: PropTypes.func,
  title: PropTypes.string,
  content: PropTypes.string,
  confirm: PropTypes.string,
  cancel: PropTypes.string,
  variant: PropTypes.string
}

ConfirmDeleteButton.defaultProps = {
  title: 'Are you sure?',
  content: 'You won\'t be able to revert this.',
  confirm: 'Yes',
  cancel: 'Cancel',
  label: 'Delete',
  variant: 'text'
}

const enhance = compose(
  withStyles(styles)
)

export default enhance(ConfirmDeleteButton)
