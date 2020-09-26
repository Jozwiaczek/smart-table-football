import React, { useEffect, useState } from 'react';

import { Button, Card, Typography } from '@material-ui/core';

import { CREATE, Link } from 'react-admin';

import { makeStyles } from '@material-ui/core/styles';

import { constants } from 'stf-core';

import dataProvider from '../../../dataProvider';

import Logo from '../../../elements/Logo';
import ThemeWrapper from '../../../elements/ThemeWrapper';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
    backgroundColor: theme.palette.background.default,
  },
  card: {
    padding: '1rem',
    width: '100%',
    minWidth: 200,
    maxWidth: 400,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    boxSizing: 'border-box',
  },
  title: {
    margin: '2rem 0 1rem 0',
  },
  logo: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    margin: '2rem 0 0.5rem 0',
    width: '100%',
  },
}));

const Verify = ({ location }) => {
  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    const extracted = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');

      try {
        await dataProvider(CREATE, constants.resources.playerAuthManagement, {
          data: {
            action: 'verifySignupLong',
            value: token,
          },
        });

        setSuccess(true);
      } catch (e) {
        console.error(e);
        setSuccess(false);
      } finally {
        setVerifying(false);
      }
    };

    extracted();
  }, [location]);

  const renderMessage = () => {
    if (verifying) {
      return (
        <Typography variant="h6" className={classes.title} align="center">
          Loading
        </Typography>
      );
    }
    if (success) {
      return (
        <Typography variant="h6" className={classes.title} align="center">
          Verification Successful
        </Typography>
      );
    }
    return (
      <Typography variant="h6" className={classes.title} align="center">
        Verification Failed
      </Typography>
    );
  };

  return (
    <ThemeWrapper>
      <div className={classes.main}>
        <Card className={classes.card}>
          <Logo linkTo="/login" className={classes.logo} />
          {renderMessage()}
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            component={Link}
            to="/login"
          >
            Back to app
          </Button>
        </Card>
      </div>
    </ThemeWrapper>
  );
};

export default Verify;
