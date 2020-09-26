import React from 'react';

import { FormTab, required, TextInput } from 'react-admin';

import { models } from 'stf-core';

const PersonalTab = ({
  classes,
  trainerSite,
  hasList,
  hasEdit,
  hasCreate,
  hasShow,
  basePath,
  ...rest
}) => (
  <FormTab label="Personal details" {...rest}>
    <TextInput source={models.players.fields.firstName} validate={required()} />
    <TextInput source={models.players.fields.lastName} validate={required()} />
  </FormTab>
);

export default PersonalTab;
