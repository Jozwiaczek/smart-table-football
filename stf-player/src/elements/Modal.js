import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { Backdrop, Dialog, Fade, Slide, makeStyles } from '@material-ui/core';
import classnames from 'classnames';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: '#FFF',
    padding: '2em',
  },
});

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = ({ isOpen, onClose, children, className, ...rest }) => {
  const classes = useStyles();

  return (
    <Dialog
      className={classes.modal}
      open={isOpen}
      TransitionComponent={Transition}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      onClose={onClose}
      {...rest}
    >
      <Fade in={isOpen}>
        <div className={classnames(classes.paper, className)}>{children}</div>
      </Fade>
    </Dialog>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired,
  classname: PropTypes.object,
};

export default Modal;
