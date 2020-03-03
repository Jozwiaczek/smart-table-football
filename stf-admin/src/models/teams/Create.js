import React from 'react'

import {
  Create,
  SimpleForm,
  TextInput,
  TopToolbar,
  ListButton,
  required,
  ReferenceArrayInput,
  SelectArrayInput
} from 'react-admin'

import {
  constants,
  models
} from 'stf-core'

const CreateActions = ({ basePath }) => (
  <TopToolbar>
    <ListButton basePath={basePath} />
  </TopToolbar>
)

const TeamCreate = (props) => (
  <Create
    {...props}
    actions={<CreateActions />}
    title='Team Create'
  >
    <SimpleForm>
      <TextInput
        source={models.teams.fields.name}
        validate={required()}
      />
      <ReferenceArrayInput
        source={models.teams.fields.players}
        reference={constants.resources.players}
        validate={required()}
        label='Players'
        sort={{
          field: models.players.fields.email,
          order: 'ASC'
        }}
        filterToQuery={searchText => ({ [`${models.players.fields.email}.$regex`]: searchText })}
      >
        <SelectArrayInput optionText={models.players.fields.email} />
      </ReferenceArrayInput>
    </SimpleForm>
  </Create>
)

export default TeamCreate
