import React from 'react'

import { Filter, List, SearchInput } from 'react-admin'

import { models } from 'stf-core'

import DateFilters from '../../../elements/DateFilters'
import TeamsInUseList from './components/TeamsInUseList'
import TeamsPendingList from './components/TeamsPendingList'
import TeamsToAcceptList from './components/TeamsToAcceptList'

export const Filters = (props) => (
  <Filter {...props}>
    <SearchInput
      label='Name'
      source={`${models.teams.fields.name}.$regex`}
      alwaysOn
    />
    {DateFilters}
  </Filter>
)

const FilteredList = (props) => (
  <>
    <TeamsInUseList {...props} />
    <TeamsPendingList {...props} />
    <TeamsToAcceptList {...props} />
  </>
)

const TeamsList = (props) => (
  <List
    {...props}
    filters={<Filters />}
    exporter={false}
  >
    <FilteredList />
  </List>
)

export default TeamsList
