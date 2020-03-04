import React from 'react'

import {
  List,
  DateField,
  Filter,
  SearchInput,
  TextField,
  Responsive,
  SimpleList,
  EditButton,
  ReferenceField,
  NumberField
} from 'react-admin'
import CustomizableDatagrid from 'ra-customizable-datagrid'

import {
  models,
  constants
} from 'stf-core'

import DateFilters from '../../elements/DateFilters'

export const Filters = (props) => (
  <Filter {...props}>
    <SearchInput
      label='Email'
      source={`${models.admins.fields.email}.$regex`}
      alwaysOn
    />

    {DateFilters}
  </Filter>
)

const MatchList = (props) =>
  <List
    {...props}
    filters={<Filters />}
  >
    <Responsive
      small={
        <SimpleList
          primaryText={record => record.id}
        />
      }
      medium={
        <CustomizableDatagrid
          defaultColumns={[
            models.matches.fields.status,
            models.matches.fields.winner
          ]}
        >
          <TextField source='_id' />
          <ReferenceField
            source={models.matches.fields.teamA}
            reference={constants.resources.teams}
            label='Team A'
          >
            <TextField source={models.teams.fields.name} />
          </ReferenceField>
          <ReferenceField
            source={models.matches.fields.teamB}
            reference={constants.resources.teams}
            label='Team B'
          >
            <TextField source={models.teams.fields.name} />
          </ReferenceField>
          <ReferenceField
            source={models.matches.fields.winner}
            reference={constants.resources.teams}
          >
            <TextField source={models.teams.fields.name} />
          </ReferenceField>
          <TextField source={models.matches.fields.status} />
          <NumberField source={models.matches.fields.replayTime} />
          <DateField source='createdAt' showTime />
          <DateField source='updatedAt' showTime />
          <EditButton />
        </CustomizableDatagrid>
      }
    />
  </List>

export default MatchList
