import React, { useEffect, useState } from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';

import { useTranslate } from 'react-admin';

import { IOSShareIcon, STFIcon } from 'stf-ui-components';

import usePWAIsIOS from '../hooks/usePWAIsIOS';
import Modal from './Modal';

const useStyles = makeStyles(() => ({
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  actionLabel: {
    margin: '20px 0',
  },
}));

const InstallPWAModal = () => {
  const classes = useStyles();
  const t = useTranslate();
  const [isOpen, setIsOpen] = useState(false);
  const { prompt } = usePWAIsIOS();

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (prompt) {
      onOpen();
    }
  }, [prompt]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={classes.contentContainer}>
        <STFIcon className={classes.icon} />
        <Typography gutterBottom variant="h5" component="h5" align="center">
          {t('installPWAModal.title')}
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary">
          {t('installPWAModal.subtitle')}
        </Typography>

        <Typography className={classes.actionLabel} variant="caption" align="center">
          {t('installPWAModal.actionLabel.tap')}
          &emsp;
          <IOSShareIcon />
          &emsp;
          {t('installPWAModal.actionLabel.thenAddToHomeScreen')}
        </Typography>
        <Button size="large" color="primary" onClick={onClose}>
          {t('installPWAModal.closeButton')}
        </Button>
      </div>
    </Modal>
  );
};

export default InstallPWAModal;
