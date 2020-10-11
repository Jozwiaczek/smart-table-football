import React from 'react';

import { FormTab, required, TextInput, useTranslate } from 'react-admin';
import { makeStyles } from '@material-ui/core';

import { models } from 'stf-core';

import AvatarInput from '../../../elements/forms/AvatarInput';

const useStyles = makeStyles(() => ({
  avatarContainer: {
    marginTop: 10,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
}));

const PersonalTab = ({ trainerSite, hasList, hasEdit, hasCreate, hasShow, basePath, ...rest }) => {
  const classes = useStyles();
  const translate = useTranslate();

  return (
    <FormTab label={translate('models.players.profile.general')} {...rest}>
      <AvatarInput
        horizontal
        className={classes.avatarContainer}
        source={models.players.fields.avatar}
      />
      <TextInput source={models.players.fields.firstName} validate={required()} />
      <TextInput source={models.players.fields.lastName} validate={required()} />
    </FormTab>
  );
};

export default PersonalTab;
