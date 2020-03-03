import React from 'react'

import {
  TextInput,
  NumberInput,
  SelectInput,
  FormTab,
  required
} from 'react-admin'

import { models, constants } from '@sbody/sbody-core'
import { getChoices } from '../../../enum'

const PersonalTab = ({
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
  <FormTab style={{ color: theme.palette.text.primary }} label={'Personal details'} {...rest} >
    <TextInput
      source={models.clients.fields.firstName}
      validate={required()}
    />
    <TextInput
      source={models.clients.fields.lastName}
      validate={required()}
    />
    <SelectInput
      source={models.clients.fields.gender}
      choices={getChoices(constants.genderEnum)}
      validate={required()}
    />
    <NumberInput
      source={models.clients.fields.initialWeight}
      validate={required()}
    />
    <NumberInput
      source={models.clients.fields.targetWeight}
      validate={required()}
    />
    <NumberInput
      source={models.clients.fields.dailyBudget}
    />
  </FormTab>
)

export default PersonalTab
