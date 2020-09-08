import React, { useState } from 'react';
import { constants, models } from 'stf-core';
import { Button, CircularProgress } from '@material-ui/core';
import Send from '@material-ui/icons/Send';

import SectionTitle from '../../../elements/SectionTitle';

const _sendVerificationEmail = async (dataProvider, player, showNotification, setIsLoading) => {
  try {
    setIsLoading(true);
    await dataProvider('CREATE', constants.resources.playerAuthManagement, {
      data: {
        action: 'resendVerifySignup',
        value: {
          email: player[models.players.fields.email],
          trainerSite: player[models.players.fields.trainerSite],
        },
      },
    });
    showNotification('Verification email sent', 'info');
  } catch (e) {
    showNotification('Verification email not sent', 'warning');
    console.error(e);
  } finally {
    setIsLoading(false);
  }
};

const ValidateEmailButton = ({ dataProvider, player, classes, showNotification }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (player[models.authManagementSchema.isVerified]) {
    return null;
  }

  const getBtnContent = () => {
    if (isLoading) {
      return (
        <div className={classes.loadingBar}>
          <CircularProgress size={17} thickness={2} />
        </div>
      );
    }
    return (
      <>
        <Send style={{ marginRight: '0.5rem' }} />
        send verification email
      </>
    );
  };

  return (
    <>
      <SectionTitle className={classes.sectionTitle}>Validate your email</SectionTitle>
      <Button
        className={classes.buttonContained}
        variant="contained"
        color="primary"
        disabled={isLoading}
        onClick={() => _sendVerificationEmail(dataProvider, player, showNotification, setIsLoading)}
      >
        {getBtnContent()}
      </Button>
    </>
  );
};

export default ValidateEmailButton;
