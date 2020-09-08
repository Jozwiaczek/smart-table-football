import React from 'react';

import { Filter, List } from 'react-admin';

import { models } from 'stf-core';

import { TextField } from 'ra-ui-materialui';

import DateFilters from '../../../elements/DateFilters';
import TeamsInUseList from './components/TeamsInUseList';
import TeamsPendingList from './components/TeamsPendingList';
import TeamsToAcceptList from './components/TeamsToAcceptList';

export const Filters = (props) => (
  <Filter {...props}>
    <TextField alwaysOn label="Name" source={`${models.teams.fields.name}.$regex`} />
    {DateFilters}
  </Filter>
);

const FilteredList = (props) => (
  <>
    <TeamsInUseList {...props} />
    <TeamsPendingList {...props} />
    <TeamsToAcceptList {...props} />
  </>
);

const TeamsList = (props) => (
  <List {...props} filters={<Filters />} exporter={false} title="Teams">
    <FilteredList />
  </List>
);

export default TeamsList;
