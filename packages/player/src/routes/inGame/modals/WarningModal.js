import React from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles, Typography } from '@material-ui/core';

import Modal from '../../../elements/Modal';

const useStyles = makeStyles(() => ({
  tableIsDisconnectedModal: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  tableIsDisconnectedModalTitle: {
    marginBottom: '0.5em',
  },
  tableIsDisconnectedModalSubtitle: {
    marginBottom: '2em',
  },
}));

const WarningModal = ({ onClose, isOpen, title, body, confirmButtonText }) => {
  const classes = useStyles();

  return (
    <Modal isOpen={isOpen} className={classes.tableIsDisconnectedModal} onClose={onClose}>
      <Typography
        variant="h3"
        component="h3"
        align="center"
        color="colorTextPrimary"
        className={classes.tableIsDisconnectedModalTitle}
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        component="h5"
        align="center"
        color="colorTextPrimary"
        className={classes.tableIsDisconnectedModalSubtitle}
      >
        {body}
      </Typography>
      <Button variant="contained" color="primary" onClick={() => onClose()}>
        {confirmButtonText}
      </Button>
    </Modal>
  );
};

WarningModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  body: PropTypes.string.isRequired,
  confirmButtonText: PropTypes.string,
};

WarningModal.defaultProps = {
  title: 'Warning',
  confirmButtonText: 'Ok, got it',
};

export default WarningModal;
