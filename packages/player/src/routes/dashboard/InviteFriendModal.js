import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles, Typography, TextField, CircularProgress } from '@material-ui/core';
import validator from 'validator';

import { useSafeSetState } from 'ra-core';

import { CREATE, useDataProvider, useNotify } from 'react-admin';
import { constants } from 'stf-core';

import Modal from '../../elements/Modal';

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '80%',
  },
  title: {
    marginBottom: '1em',
  },
  input: {
    marginBottom: '3em',
    height: '4em',
  },
  actionContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const InviteFriendModal = ({ onClose, isOpen }) => {
  const classes = useStyles();
  const [loading, setLoading] = useSafeSetState(false);
  const [invitationEmail, setInvitationEmail] = useState('');
  const [error, setError] = useState('');
  const dataProvider = useDataProvider();
  const notify = useNotify();

  const sendInvitation = async () => {
    setLoading(true);
    if (!invitationEmail) {
      setError('Invitation email is required');
      setLoading(false);
      return;
    }
    if (!validator.isEmail(invitationEmail)) {
      setError('Incorrect email');
      setLoading(false);
      return;
    }

    try {
      await dataProvider(CREATE, constants.resources.mailer, {
        data: {
          to: invitationEmail,
          subject: 'Smart Table Football - Invitation to Game',
          html: `You have invitation to the <a href="https://smart-table-football.netlify.app/#/login">Smart Table Football</a> game.`,
        },
      });
      notify('Email invitation sent');
    } catch (error) {
      notify(
        typeof error === 'string'
          ? error
          : typeof error === 'undefined' || !error.message
          ? 'Error sending email'
          : error.message,
        'warning',
      );
    } finally {
      setLoading(false);
    }

    setInvitationEmail('');
    onClose();
  };

  const onChangeInput = (event) => {
    if (error) {
      setError('');
    }

    setInvitationEmail(event.target.value);
  };

  return (
    <Modal isOpen={isOpen} className={classes.modal} onClose={onClose}>
      <Typography variant="h4" align="center" color="textPrimary" className={classes.title}>
        Invitation
      </Typography>

      <TextField
        autoFocus
        required
        fullWidth
        autoComplete="off"
        id="invitationEmail"
        name="invitationEmail"
        variant="outlined"
        error={Boolean(error)}
        value={invitationEmail}
        type="email"
        label="Email"
        helperText={error}
        className={classes.input}
        onChange={onChangeInput}
      />

      <div className={classes.actionContainer}>
        <Button variant="outlined" color="primary" onClick={() => onClose()}>
          Cancel
        </Button>
        <Button variant="contained" disabled={loading} color="primary" onClick={sendInvitation}>
          {loading && (
            <div className={classes.loadingBar}>
              <CircularProgress size={15} thickness={2} />
            </div>
          )}
          Send invitation
        </Button>
      </div>
    </Modal>
  );
};

InviteFriendModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default InviteFriendModal;
