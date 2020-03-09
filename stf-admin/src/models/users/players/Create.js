import React from 'react'

import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  TopToolbar,
  ListButton,
  required
} from 'react-admin'

import {
  constants,
  models
} from 'stf-core'

import {
  getChoices
} from '../../../enum'

const CreateActions = ({ basePath }) => (
  <TopToolbar>
    <ListButton basePath={basePath} />
  </TopToolbar>
)

const PlayerCreate = (props) => (
  <Create
    {...props}
    actions={<CreateActions />}
    title='Player Create'
  >
    <SimpleForm>
      <TextInput
        source={models.players.fields.email}
        type='email'
        validate={required()}
      />
      <TextInput
        source={models.players.fields.password}
        type='password'
        validate={required()}
      />
      <TextInput
        source={models.players.fields.firstName}
        validate={required()}
      />
      <TextInput
        source={models.players.fields.lastName}
        validate={required()}
      />
      <SelectInput
        source={models.players.fields.status}
        choices={getChoices(constants.statusEnum)}
        initialValues={constants.statusEnum.approved}
      />
      <SelectInput
        label='Language'
        source={models.players.fields.locale}
        choices={getChoices(constants.locales)}
        validate={required()}
      />
    </SimpleForm>
  </Create>
)

export default PlayerCreate
