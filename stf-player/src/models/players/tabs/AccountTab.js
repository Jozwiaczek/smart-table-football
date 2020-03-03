import React from 'react'

import {
  TextField,
  TextInput,
  BooleanInput,
  FormTab,
  required
} from 'react-admin'

import { models } from '@sbody/sbody-core'

const AccountTab = ({
  theme,
  classes,
  trainerSite,
  hasList,
  hasEdit,
  hasCreate,
  hasShow,
  basePath,
  ...rest
}) => (
  <FormTab style={{ color: theme.palette.text.primary }} label={'Account details'} {...rest} >
    <TextInput
      source={models.clients.fields.email}
      type='email'
      validate={required()}
      disabled
      helperText={`To change your email contact: ${trainerSite && trainerSite.email}`}
    />
    <TextField
      source={models.clients.fields.status}
    />
    <BooleanInput
      source={models.clients.fields.useCalories}
      label={'Use calories'}
    />
  </FormTab>
)

export default AccountTab
