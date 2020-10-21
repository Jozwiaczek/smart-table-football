import React from 'react';

import {
  DateField,
  EditButton,
  Filter,
  List,
  NumberField,
  ReferenceField,
  Responsive,
  SimpleList,
  TextField,
} from 'react-admin';
import CustomizableDatagrid from 'ra-customizable-datagrid';

import { constants, models } from 'stf-core';

import DateFilters from '../../elements/DateFilters';

export const Filters = (props) => (
  <Filter {...props}>
    <TextField alwaysOn label="Email" source={`${models.admins.fields.email}.$regex`} />

    {DateFilters}
  </Filter>
);

const MatchList = (props) => (
  <List {...props} filters={<Filters />}>
    <Responsive
      small={<SimpleList primaryText={(record) => record && record.id} />}
      medium={
        <CustomizableDatagrid
          defaultColumns={[models.matches.fields.status, models.matches.fields.winner]}
        >
          <TextField source="_id" />
          <ReferenceField
            source={models.matches.fields.teamA}
            reference={constants.resources.teams}
            label="Team A"
          >
            <TextField source={models.teams.fields.name} />
          </ReferenceField>
          <ReferenceField
            source={models.matches.fields.teamB}
            reference={constants.resources.teams}
            label="Team B"
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
          <DateField showTime source="createdAt" />
          <DateField showTime source="updatedAt" />
          <EditButton />
        </CustomizableDatagrid>
      }
    />
  </List>
);

export default MatchList;
