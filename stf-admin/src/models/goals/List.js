import React, { useEffect, useState } from 'react'

import {
  List,
  DateField,
  Filter,
  SearchInput,
  TextField,
  Responsive,
  SimpleList,
  ReferenceField,
  ChipField,
  FunctionField,
  withDataProvider,
  ShowButton,
  BooleanField
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

const MatchField = ({ teams, ...rest }) => {
  if (teams.length === 0) return null

  const match = rest.record
  const teamA = teams.find(team => team.id === match[models.matches.fields.teamA])
  const teamB = teams.find(team => team.id === match[models.matches.fields.teamB])
  return (
    <FunctionField
      label='Name' reference={match.id} render={() =>
        <>
          <ChipField record={teamA} source={models.teams.fields.name} />
          vs
          <ChipField record={teamB} source={models.teams.fields.name} />
        </>}
    />
  )
}

const IsReplay = ({ record }) => {
  const value = !!record[models.goals.fields.replay]
  return <BooleanField source='isReplay' record={{ isReplay: value }} />
}
IsReplay.defaultProps = { label: 'Saved replay' }

const GoalsList = ({
  dataProvider,
  ...rest
}) => {
  const [teams, setTeams] = useState([])

  useEffect(() => {
    const getTeams = async () => {
      setTeams(await dataProvider('GET_LIST', constants.resources.teams, {})
        .then(result => result.data))
    }
    getTeams()
  }, [dataProvider])

  return (
    <List
      {...rest}
      filters={<Filters />}
    >
      <Responsive
        small={
          <SimpleList
            primaryText={record => record[models.goals.fields.match]}
            secondaryText={record => record[models.goals.fields.team]}
          />
        }
        medium={
          <CustomizableDatagrid
            defaultColumns={[
              models.goals.fields.match,
              models.goals.fields.team,
              'isReplay'
            ]}
          >
            <TextField source='_id' />
            <ReferenceField
              source={models.goals.fields.match}
              reference={constants.resources.matches}
            >
              <MatchField teams={teams} {...rest} />
            </ReferenceField>
            <ReferenceField
              source={models.goals.fields.team}
              reference={constants.resources.teams}
            >
              <TextField source={models.teams.fields.name} />
            </ReferenceField>
            <IsReplay {...rest} />
            <DateField source='createdAt' showTime />
            <DateField source='updatedAt' showTime />
            <ShowButton />
          </CustomizableDatagrid>
        }
      />
    </List>
  )
}

export default withDataProvider(GoalsList)
