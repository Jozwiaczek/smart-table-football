import React from 'react';

import {
  ChipField,
  EditButton,
  Filter,
  List,
  ReferenceArrayField,
  Responsive,
  SimpleList,
  SingleFieldList,
} from 'react-admin';

import { constants, models } from 'stf-core';

import { TextField, Datagrid } from 'ra-ui-materialui';

import DateFilters from '../../elements/DateFilters';
import { getPlayerId } from '../../utils/getPlayerId';

const Filters = (props) => (
  <Filter {...props}>
    <TextField alwaysOn label="Name" source={`${models.teams.fields.name}.$regex`} />
    {DateFilters}
  </Filter>
);

const TeamsList = (props) => (
  <List
    {...props}
    filters={<Filters />}
    exporter={false}
    title="Teams"
    filter={{
      [models.teams.fields.players]: {
        $in: getPlayerId(),
      },
    }}
  >
    <Responsive
      small={<SimpleList primaryText={(record) => record && record[models.teams.fields.name]} />}
      medium={
        <Datagrid>
          <TextField source={models.teams.fields.name} />
          <ReferenceArrayField
            source={models.teams.fields.players}
            reference={constants.resources.players}
          >
            <SingleFieldList>
              <ChipField source={models.players.fields.email} />
            </SingleFieldList>
          </ReferenceArrayField>
          <EditButton />
        </Datagrid>
      }
    />
  </List>
);

export default TeamsList;
