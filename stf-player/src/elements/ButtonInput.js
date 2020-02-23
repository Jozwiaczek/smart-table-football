import React from 'react'
import PropTypes from 'prop-types'
import {
  Labeled,
  translate
} from 'react-admin'
import { connect } from 'react-redux'
import { startUndoable as startUndoableAction } from 'ra-core'
import MuiButton from '@material-ui/core/Button'

const ButtonInput = (props) => {
  const handleClick = () => {
    const { startUndoable, record } = props
    if (props.onClick) props.onClick(record.id, record)
    if (props.action) startUndoable(props.action(record.id, record))
  }

  return (
    <Labeled label={props.translate(props.label)}>
      <MuiButton
        label={props.translate(props.buttonLabel)}
        onClick={handleClick}
        color='primary'
      >
        {props.children}&nbsp;
        {props.translate(props.buttonLabel)}
      </MuiButton>
    </Labeled>
  )
}

ButtonInput.propTypes = {
  startUndoable: PropTypes.func,
  record: PropTypes.object,
  label: PropTypes.string,
  buttonLabel: PropTypes.string,
  action: PropTypes.func,
  onClick: PropTypes.func
}

ButtonInput.contextTypes = {
  translate: PropTypes.func
}

export default translate(connect(null, {
  startUndoable: startUndoableAction
})(ButtonInput))
