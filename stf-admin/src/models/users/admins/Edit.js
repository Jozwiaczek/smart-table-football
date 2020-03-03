import React from 'react'

import {
  DateField,
  TextInput,
  TextField,
  Edit,
  SelectInput,
  TopToolbar,
  ListButton,
  CloneButton,
  TabbedForm,
  FormTab,
  required
} from 'react-admin'

import {
  constants,
  models
} from 'stf-core'

import {
  getChoices
} from '../../../enum'

const EditActions = ({ basePath, data }) => (
  <TopToolbar>
    <ListButton basePath={basePath} />
    <CloneButton basePath={basePath} record={data} />
  </TopToolbar>
)

const AdminEdit = (props) => (
  <Edit
    {...props}
    actions={<EditActions />}
    undoable={false}
    title='Admin Edit'
  >
    <TabbedForm
      redirect={false}
    >
      <FormTab
        label='summary'
      >
        <TextField source='id' />
        <TextInput
          source={models.admins.fields.email}
          type='email'
          validate={required()}
        />
        <TextInput
          source={models.admins.fields.password}
          type='password'
        />
        <SelectInput
          source={models.admins.fields.status}
          choices={getChoices(constants.statusEnum)}
        />
        <DateField source='createdAt' showTime />
        <DateField source='updatedAt' showTime />
      </FormTab>
    </TabbedForm>
  </Edit>
)

export default AdminEdit
