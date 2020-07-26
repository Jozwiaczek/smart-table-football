import React from 'react'

import {
  Create,
  ListButton,
  maxValue,
  minValue,
  number,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TopToolbar
} from 'react-admin'

import { InputAdornment } from '@material-ui/core'

import { constants, models } from 'stf-core'

import { getChoices } from '../../enum'

const CreateActions = ({ basePath }) => (
  <TopToolbar>
    <ListButton basePath={basePath} />
  </TopToolbar>
)

const MatchCreate = (props) => (
  <Create
    {...props}
    actions={<CreateActions />}
    title='Match Create'
  >
    <SimpleForm>
      <ReferenceInput
        source={models.matches.fields.teamA}
        reference={constants.resources.teams}
        validate={required()}
        label='Team A'
        sort={{
          field: models.teams.fields.name,
          order: 'ASC'
        }}
      >
        <SelectInput optionText={models.teams.fields.name} />
      </ReferenceInput>

      <ReferenceInput
        source={models.matches.fields.teamB}
        reference={constants.resources.teams}
        validate={[required()]}
        label='Team B'
        sort={{
          field: models.teams.fields.name,
          order: 'ASC'
        }}
      >
        <SelectInput optionText={models.teams.fields.name} />
      </ReferenceInput>

      <SelectInput
        source={models.matches.fields.status}
        choices={getChoices(constants.statusMatch)}
        validate={required()}
      />

      <NumberInput
        source={models.matches.fields.replayTime}
        validate={[required(), minValue(4), maxValue(10), number()]}
        default={7}
        options={{
          InputProps: { endAdornment: <InputAdornment position='start'>seconds</InputAdornment> }
        }}
      />
    </SimpleForm>
  </Create>
)

export default MatchCreate
