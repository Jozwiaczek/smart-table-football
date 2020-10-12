import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { Field, Form } from 'react-final-form';
import compose from 'recompose/compose';

import { Button, CardContent, CircularProgress, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import red from '@material-ui/core/colors/red';

import { constants, models } from 'stf-core';

import { useNotify, useTranslate } from 'react-admin';

import dataProvider from '../../../dataProvider';
import FormTextField from '../../../elements/forms/FormTextField';
import { validatePasswordRecovery } from '../validate';
import AuthRouteLayout from '../AuthRouteLayout';

const useStyles = makeStyles(() => ({
  input: {
    marginBottom: '2.5rem',
    height: '2em',
  },
  lastInput: {
    height: '2em',
  },
  button: {
    width: '100%',
  },
  loadingBar: {
    marginRight: '1em',
    display: 'flex',
    alignItems: 'center',
  },
  warning: {
    marginTop: '2rem',
    marginBottom: '0.5rem',
    textAlign: 'center',
    color: red[500],
  },
  divider: {
    marginTop: '2.5rem',
    width: '100%',
    height: '1rem',
  },
  title: {
    margin: '1rem 0rem',
  },
}));

const PasswordRecovery = ({ location, history }) => {
  const [processing, setProcessing] = useState(false);

  const classes = useStyles();
  const notify = useNotify();
  const translate = useTranslate();

  const changePassword = async (formData) => {
    try {
      setProcessing(true);
      const token = new URLSearchParams(location.search).get('reset_token');

      await dataProvider('CREATE', constants.resources.playerAuthManagement, {
        data: {
          action: 'resetPwdLong',
          value: {
            token,
            password: formData.password,
          },
        },
      });

      history.push('/login');
    } catch (e) {
      setProcessing(false);
      await notify(e.message, 'warning');
    }
  };

  return (
    <AuthRouteLayout>
      <CardContent>
        <Typography variant="h5" className={classes.title}>
          Change password
        </Typography>
        <Form
          validate={(values) => validatePasswordRecovery(values, translate)}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field
                required
                id={models.players.fields.password}
                name={models.players.fields.password}
                component={FormTextField}
                label="New password"
                type="password"
                disabled={processing}
                className={classes.input}
              />
              <Field
                required
                id="repeatPassword"
                name="repeatPassword"
                component={FormTextField}
                label="Repeat password"
                type="password"
                disabled={processing}
                className={classes.lastInput}
              />
              <div className={classes.divider} />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={processing}
                className={classes.button}
              >
                <div className={classes.loadingBar}>
                  {processing && <CircularProgress size={17} thickness={2} />}
                </div>
                Set new password
              </Button>
            </form>
          )}
          onSubmit={changePassword}
        />
      </CardContent>
    </AuthRouteLayout>
  );
};

const enhance = compose(withRouter);

export default enhance(PasswordRecovery);
