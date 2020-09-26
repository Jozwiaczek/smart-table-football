import React from 'react';
import { Field } from 'react-final-form';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import { models } from 'stf-core';

import FormTextField from '../../../elements/forms/FormTextField';

const useStyles = makeStyles(() => ({
  container: {
    marginBottom: '1.5em',
    height: '4em',
    width: '50%',
  },
  field: {
    width: '80%',
  },
}));

const CheckIconElement = ({ touched, error }) => {
  if (!touched) return null;
  if (error) {
    return <CancelIcon color="error" />;
  }
  return <CheckIcon color="primary" />;
};

// TODO: Add invite mail if provided user doesnt exists
const TeamMateCreateField = ({ loading, touched, errors }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={1} alignItems="center" className={classes.container}>
      <Grid item className={classes.field}>
        <Field
          required
          id={models.teams.fields.invited}
          name={models.teams.fields.invited}
          component={FormTextField}
          label="Team Mate Email"
          disabled={loading}
        />
      </Grid>
      <Grid item>
        <CheckIconElement
          touched={touched[models.teams.fields.invited]}
          error={errors.providedInvited}
        />
      </Grid>
    </Grid>
  );
};

TeamMateCreateField.propTypes = {};

export default TeamMateCreateField;
