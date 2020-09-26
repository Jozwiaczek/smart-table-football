import React from 'react';
import PropTypes from 'prop-types';
import { Labeled, translate } from 'react-admin';
import { connect } from 'react-redux';
import { startUndoable as startUndoableAction } from 'ra-core';
import MuiButton from '@material-ui/core/Button';

const ButtonInput = ({
  action,
  translate,
  startUndoable,
  record,
  onClick,
  label,
  buttonLabel,
  children,
}) => {
  const handleClick = () => {
    if (onClick) onClick(record.id, record);
    if (action) startUndoable(action(record.id, record));
  };

  return (
    <Labeled label={translate(label)}>
      <MuiButton label={translate(buttonLabel)} color="primary" onClick={handleClick}>
        {children}&nbsp;
        {translate(buttonLabel)}
      </MuiButton>
    </Labeled>
  );
};

ButtonInput.propTypes = {
  startUndoable: PropTypes.func,
  record: PropTypes.object,
  label: PropTypes.string,
  buttonLabel: PropTypes.string,
  action: PropTypes.func,
  onClick: PropTypes.func,
  children: PropTypes.array,
};

ButtonInput.contextTypes = {
  translate: PropTypes.func,
};

export default translate(
  connect(null, {
    startUndoable: startUndoableAction,
  })(ButtonInput),
);
