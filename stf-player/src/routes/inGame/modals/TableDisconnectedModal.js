import React from 'react'
import PropTypes from 'prop-types'
import { Button, Typography, makeStyles } from '@material-ui/core'
import Modal from '../../../elements/Modal'

const useStyles = makeStyles(() => ({
  tableIsDisconnectedModal: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  tableIsDisconnectedModalTitle: {
    marginBottom: '0.5em'
  },
  tableIsDisconnectedModalSubtitle: {
    marginBottom: '2em'
  }
}))

const TableDisconnectedModal = ({ onClose, isOpen }) => {
  const classes = useStyles()

  return (
    <Modal onClose={onClose} isOpen={isOpen} className={classes.tableIsDisconnectedModal}>
      <Typography variant='h3' align='center' className={classes.tableIsDisconnectedModalTitle}>
          Table was disconnected
      </Typography>
      <Typography variant='h5' align='center' className={classes.tableIsDisconnectedModalSubtitle}>
          Stay calm, your match was paused
      </Typography>
      <Button onClick={() => onClose()} variant='contained' color='primary'>
          Return to dashboard
      </Button>
    </Modal>
  )
}

TableDisconnectedModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
}

export default TableDisconnectedModal
