import React from 'react'

import { DateField, FormTab, required, TextField, TextInput } from 'react-admin'

import { models } from 'stf-core'

const AccountTab = ({
  classes,
  trainerSite,
  hasList,
  hasEdit,
  hasCreate,
  hasShow,
  basePath,
  ...rest
}) => (
  <FormTab label={'Account details'} {...rest} >
    <TextInput
      source={models.players.fields.email}
      type='email'
      validate={required()}
      disabled
      helperText={`To change your email contact: support@stf.io`}
    />
    <TextField
      source={models.players.fields.status}
    />
    <DateField source='createdAt' showTime />
    <DateField source='updatedAt' showTime />
  </FormTab>
)

export default AccountTab
