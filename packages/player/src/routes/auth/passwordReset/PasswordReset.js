import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'react-final-form';
import { Link, useNotify } from 'react-admin';
import { translate } from 'ra-core';
import { Button, CardContent, CircularProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { constants, models } from 'stf-core';
import red from '@material-ui/core/colors/red';

import dataProvider from '../../../dataProvider';
import FormTextField from '../../../elements/forms/FormTextField';
import { validatePasswordReset } from '../validate';
import AuthRouteLayout from '../AuthRouteLayout';

const useStyles = makeStyles(() => ({
  input: {
    marginBottom: '2rem',
    height: '2em',
  },
  button: {
    marginTop: '2rem',
    width: '100%',
  },
  warning: {
    color: red[500],
  },
  backLink: {
    marginTop: '2em',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  loadingBar: {
    marginRight: '1em',
    display: 'flex',
    alignItems: 'center',
  },
}));

const PasswordReset = ({ history }) => {
  const [processing, setProcessing] = useState(false);

  const classes = useStyles();
  const notify = useNotify();

  const sendEmail = async (userData) => {
    try {
      setProcessing(true);
      await dataProvider('CREATE', constants.resources.playerAuthManagement, {
        data: {
          action: 'sendResetPwd',
          value: { email: userData.email },
        },
      });
      history.push('/passwordEmailSend');
    } catch (e) {
      setProcessing(false);
      await notify(e.message, 'warning');
    }
  };

  return (
    <AuthRouteLayout>
      <CardContent>
        <Form
          validate={(values) => validatePasswordReset(values, translate)}
          render={({ handleSubmit }) => (
            <form className={classes.form} onSubmit={handleSubmit}>
              <Field
                autoFocus
                required
                id={models.players.fields.email}
                name={models.players.fields.email}
                component={FormTextField}
                label="Email"
                disabled={processing}
                className={classes.input}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={processing}
                className={classes.button}
              >
                {processing && (
                  <div className={classes.loadingBar}>
                    <CircularProgress size={17} thickness={2} />
                  </div>
                )}
                Send password reset link
              </Button>
              <Typography
                className={classes.backLink}
                component={Link}
                to="/login"
                variant="caption"
              >
                Back to login
              </Typography>
            </form>
          )}
          onSubmit={sendEmail}
        />
      </CardContent>
    </AuthRouteLayout>
  );
};

PasswordReset.propTypes = {
  history: PropTypes.object,
};

export default PasswordReset;
