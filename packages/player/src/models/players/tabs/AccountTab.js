import React from 'react';

import { DateField, FormTab, required, TextField, TextInput, useTranslate } from 'react-admin';

import { models } from 'stf-core';

const AccountTab = ({
  classes,
  trainerSite,
  hasList,
  hasEdit,
  hasCreate,
  hasShow,
  basePath,
  ...rest
}) => {
  const translate = useTranslate();

  return (
    <FormTab label={translate('models.players.profile.account')} {...rest}>
      <TextInput
        disabled
        source={models.players.fields.email}
        type="email"
        validate={required()}
        helperText="To change your email contact: support@stf.io"
      />
      <TextField source={models.players.fields.status} />
      <DateField showTime source="createdAt" />
      <DateField showTime source="updatedAt" />
    </FormTab>
  );
};

export default AccountTab;
