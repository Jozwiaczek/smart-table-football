import React from 'react';
import { Link } from 'react-admin';
import { Button, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AuthRouteLayout from '../AuthRouteLayout';

const useStyles = makeStyles(() => ({
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
    <AuthRouteLayout>
      <CardContent>
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
    </AuthRouteLayout>
  );
};

export default PasswordEmailSend;
