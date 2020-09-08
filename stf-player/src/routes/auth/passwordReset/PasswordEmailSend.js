import React from 'react';
import { Link, Notification } from 'react-admin';

import { Button, Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import BackgroundGraphic from '../../../elements/BackgroundGraphic';
import Logo from '../../../elements/Logo';
import ThemeWrapper from '../../../elements/ThemeWrapper';

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
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
  logo: {
    marginBottom: '2rem',
  },
  button: {
    width: '100%',
  },
  text: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
}));

const PasswordEmailSend = () => {
  const classes = useStyles();

  return (
    <ThemeWrapper>
      <BackgroundGraphic className={classes.main}>
        <Card className={classes.card}>
          <CardContent>
            <Logo linkTo="/login" className={classes.logo} />
            <Typography className={classes.text} variant="h5">
              Email has been sent.
              <br />
              Please check your emails.
            </Typography>
            <Button
              type="submit"
              variant="contained"
              component={Link}
              to="/login"
              color="primary"
              className={classes.button}
            >
              Go to login page
            </Button>
          </CardContent>
        </Card>
        <Notification />
      </BackgroundGraphic>
    </ThemeWrapper>
  );
};

export default PasswordEmailSend;
