import React from 'react'
import PropTypes from 'prop-types'

import { Backdrop, Dialog, Fade, Slide, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: '#FFF',
    padding: '2em'
  }
})

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const Modal = ({
  isOpen,
  onClose,
  children,
  ...rest
}) => {
  const classes = useStyles()

  return (
    <Dialog
      className={classes.modal}
      open={isOpen}
      onClose={onClose}
      TransitionComponent={Transition}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
      {...rest}
    >
      <Fade in={isOpen}>
        <div className={classes.paper}>
          {children}
        </div>
      </Fade>
    </Dialog>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired
}

export default Modal
