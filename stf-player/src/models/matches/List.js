import React, { useEffect, useState } from 'react'
import compose from 'recompose/compose'

import {
  DateField,
  Filter,
  FunctionField,
  GET_MANY,
  List,
  ReferenceField,
  Responsive,
  SearchInput,
  SimpleList,
  TextField,
  withDataProvider
} from 'react-admin'
import CustomizableDatagrid from 'ra-customizable-datagrid'

import { Button, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import AssessmentIcon from '@material-ui/icons/Assessment'
import SlowMotionVideoIcon from '@material-ui/icons/SlowMotionVideo'

import { constants, models } from 'stf-core'

import DateFilters from '../../elements/DateFilters'
import { getTimerUnit } from '../../utils/getTimerUnits'
import { useSelector } from 'react-redux'

const styles = {
  buttonIcon: {
    marginRight: '0.3em'
  }
}

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

const ShowStatistic = ({ classes, record, history, mobile }) => {
  return (
    <Button color='primary' onClick={() => history.push(`/${constants.resources.matches}/${record._id}`)}>
      <AssessmentIcon className={classes.buttonIcon} />
      {mobile ? null : 'Statistic'}
    </Button>
  )
}

const ContinueButton = ({ classes, record, history, mobile, disabled }) => {
  if (record[models.matches.fields.status] === constants.statusMatch.paused) {
    return (
      <Button color='primary' disabled={disabled} onClick={() => history.push({ pathname: '/inGame', search: `?match=${record._id}` })}>
        <SlowMotionVideoIcon className={classes.buttonIcon} />
        {mobile ? null : 'Continue'}
      </Button>
    )
  }
  return null
}

const TeamsMobileField = ({ teams, record }) => {
  if (!teams) return null
  const teamA = teams.find(team => team._id === record[models.matches.fields.teamA])
  const teamB = teams.find(team => team._id === record[models.matches.fields.teamB])
  return (
    <Typography>
      {teamA[models.teams.fields.name]} vs {teamB[models.teams.fields.name]}
    </Typography>
  )
}

const WinnerMobileField = ({ teams, record }) => {
  if (!teams || !record[models.matches.fields.winner]) return null
  const winner = teams.find(team => team._id === record[models.matches.fields.winner])
  return (
    <Typography>
      Winner: {winner[models.teams.fields.name]}
    </Typography>
  )
}

const MatchList = ({ classes, dataProvider, ...rest }) => {
  const [teams, setTeams] = useState(null)

  const tableStatus = useSelector(state => state.table.isActive)

  useEffect(() => {
    const call = async () => {
      try {
        const res = await dataProvider(GET_MANY, constants.resources.teams, {
          pagination: { page: 1, perPage: 5 }
        })
        setTeams(res)
      } catch (e) {
        console.log(e)
        throw new Error(e)
      }
    }
    call()
  }, [dataProvider])

  return (
    <List
      {...rest}
      filters={<Filters />}
      exporter={false}
    >
      <Responsive
        small={
          <SimpleList
            primaryText={record => <TeamsMobileField teams={teams} record={record} />}
            secondaryText={record => <WinnerMobileField teams={teams} record={record} />}
            tertiaryText={record => (
              <>
                <ContinueButton classes={classes} mobile record={record} {...rest} />
                <ShowStatistic classes={classes} mobile record={record} {...rest} />
              </>
            )}
            linkType={false}
          />
        }
        medium={
          <CustomizableDatagrid
            defaultColumns={[
              models.matches.fields.status,
              models.matches.fields.winner
            ]}
          >
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
            <FunctionField
              source={models.matches.fields.elapsedTime} label='Time' render={record => {
                const elapsedTime = record[models.matches.fields.elapsedTime]
                return (
                  `${getTimerUnit(elapsedTime).min}:${getTimerUnit(elapsedTime).sec}`
                )
              }}
            />
            <DateField source='createdAt' showTime />
            <ContinueButton classes={classes} disabled={!tableStatus} {...rest} />
            <ShowStatistic classes={classes} {...rest} />
          </CustomizableDatagrid>
        }
      />
    </List>
  )
}

const enhance = compose(
  withStyles(styles),
  withDataProvider
)

export default enhance(MatchList)
