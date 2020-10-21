import React from 'react';

import {
  ChipField,
  DateField,
  EditButton,
  Filter,
  List,
  ReferenceArrayField,
  Responsive,
  SimpleList,
  SingleFieldList,
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

const TeamsList = (props) => {
  return (
    <List {...props} filters={<Filters />}>
      <Responsive
        small={<SimpleList primaryText={(record) => record && record[models.teams.fields.name]} />}
        medium={
          <CustomizableDatagrid
            defaultColumns={[models.teams.fields.name, models.teams.fields.players]}
          >
            <TextField source="_id" />
            <TextField source={models.teams.fields.name} />
            <ReferenceArrayField
              source={models.teams.fields.players}
              reference={constants.resources.players}
            >
              <SingleFieldList>
                <ChipField source={models.players.fields.email} />
              </SingleFieldList>
            </ReferenceArrayField>
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
            <EditButton />
          </CustomizableDatagrid>
        }
      />
    </List>
  );
};

export default TeamsList;
