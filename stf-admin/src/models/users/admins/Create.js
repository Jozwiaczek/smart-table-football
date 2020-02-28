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

const AdminCreate = (props) => (
  <Create
    {...props}
    actions={<CreateActions />}
    title={'Admin Create'}
  >
    <SimpleForm>
      <TextInput
        source={models.admins.fields.email}
        type='email'
        validate={required()}
      />
      <TextInput
        source={models.admins.fields.password}
        type='password'
        validate={required()}
      />
      <SelectInput
        source={models.admins.fields.status}
        choices={getChoices(constants.statusEnum)}
        initialValues={constants.statusEnum.approved}
      />
    </SimpleForm>
  </Create>
)

export default AdminCreate
