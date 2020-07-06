import React, { cloneElement, useEffect, useState } from 'react'
import compose from 'recompose/compose'

import {
  CreateButton,
  DateField,
  Filter,
  FunctionField,
  GET_LIST,
  List,
  ReferenceField,
  Responsive,
  sanitizeListRestProps,
  SearchInput,
  SimpleList,
  TextField,
  TopToolbar,
  useRefresh,
  withDataProvider
} from 'react-admin'
import CustomizableDatagrid from 'ra-customizable-datagrid'

import { Button, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import AssessmentIcon from '@material-ui/icons/Assessment'
import SlowMotionVideoIcon from '@material-ui/icons/SlowMotionVideo'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople'

import { constants, models } from 'stf-core'

import DateFilters from '../../elements/DateFilters'
import { getTimerUnit } from '../../utils/getTimerUnits'
import { useSelector } from 'react-redux'
import { getPlayerId } from '../../utils/getPlayerId'
import { socket } from '../../client/feathersSocketClient'

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

const ContinueButton = ({ classes, record, history, mobile, disabled, isInGame }) => {
  if (isInGame === record.id) {
    return (
      <Button color='action' disabled={disabled} onClick={() => history.push({ pathname: '/inGame', search: `?match=${record._id}` })}>
        <EmojiPeopleIcon className={classes.buttonIcon} color='action' />
        {mobile ? null : 'Join'}
      </Button>
    )
  }

  if (record[models.matches.fields.status] === constants.statusMatch.paused) {
    return (
      <Button color='primary' disabled={disabled || isInGame} onClick={() => history.push({ pathname: '/inGame', search: `?match=${record._id}` })}>
        <SlowMotionVideoIcon className={classes.buttonIcon} />
        {mobile ? null : 'Resume'}
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

const Timer = ({ record, globalElapsedTimer, isInGame, ...rest }) => {
  if (isInGame === record.id) {
    return (
      <FunctionField
        {...rest}
        record={record}
        source={models.matches.fields.elapsedTime}
        render={record => {
          return (
            `${getTimerUnit(globalElapsedTimer).min}:${getTimerUnit(globalElapsedTimer).sec}`
          )
        }}
      />
    )
  }
  return (
    <FunctionField
      {...rest}
      record={record}
      source={models.matches.fields.elapsedTime}
      render={record => {
        const elapsedTime = record[models.matches.fields.elapsedTime]
        return (
          `${getTimerUnit(elapsedTime).min}:${getTimerUnit(elapsedTime).sec}`
        )
      }}
    />
  )
}

const rowStyle = (record = {}, isInGame) => {
  if (isInGame === record.id) {
    return { backgroundColor: 'rgba(255,152,0,0.10)' }
  }
  return {}
}

const MatchList = ({ classes, dataProvider, ...rest }) => {
  const [teams, setTeams] = useState([])
  const [playerTeamsIds, setPlayerTeamsIds] = useState([])
  const [globalElapsedTimer, setGlobalElapsedTimer] = useState(0)
  const refresh = useRefresh()

  const tableStatus = useSelector(state => state.table.isActive)
  const isInGame = useSelector(state => state.table.isInGame)

  useEffect(() => {
    const call = async () => {
      try {
        const teamsRes = await dataProvider(GET_LIST, constants.resources.teams, { filter: {} }).then(res => res.data)
        setTeams(teamsRes)
        const playerTeamsRes = teamsRes.filter(team => team[models.teams.fields.players].includes(getPlayerId()))
        setPlayerTeamsIds(playerTeamsRes.map(team => team.id))
      } catch (e) {
        console.error(e)
      }
    }
    call()
  }, [dataProvider, isInGame])

  useEffect(() => {
    const req = () => {
      socket.on('currentStepTime', currentStepTime => {
        setGlobalElapsedTimer(currentStepTime)
      })
    }
    req()
  }, [isInGame, setGlobalElapsedTimer])

  useEffect(() => {
    const req = () => {
      if (!isInGame) {
        refresh()
      }
    }
    req()
  }, [isInGame])

  const ListActions = ({
    className,
    resource,
    filters,
    displayedFilters,
    filterValues,
    basePath,
    showFilter,
    ...rest
  }) => (
    <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
      {filters && cloneElement(filters, {
        resource,
        showFilter,
        displayedFilters,
        filterValues,
        context: 'button'
      })}
      <CreateButton basePath={basePath} disabled={isInGame} />
    </TopToolbar>
  )

  if (!playerTeamsIds || playerTeamsIds.length === 0) {
    return null
  }

  return (
    <List
      {...rest}
      filters={<Filters />}
      actions={<ListActions />}
      filter={{
        $or: [
          { [models.matches.fields.teamA]: {
            $in: playerTeamsIds
          } },
          {
            [models.matches.fields.teamB]: {
              $in: playerTeamsIds
            }
          }
        ]
      }}
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
            rowStyle={record => rowStyle(record, isInGame)}
            defaultColumns={[
              models.matches.fields.status,
              models.matches.fields.winner,
              models.matches.fields.teamA,
              models.matches.fields.teamB
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
            <Timer
              globalElapsedTimer={globalElapsedTimer}
              classes={classes}
              disabled={!tableStatus}
              isInGame={isInGame}
              label='Time NEW'
              {...rest}
            />
            <FunctionField
              source={models.matches.fields.elapsedTime} label='Time' render={record => {
                const elapsedTime = record[models.matches.fields.elapsedTime]
                return (
                  `${getTimerUnit(elapsedTime).min}:${getTimerUnit(elapsedTime).sec}`
                )
              }}
            />
            <ContinueButton classes={classes} disabled={!tableStatus} isInGame={isInGame} {...rest} />
            <ShowStatistic classes={classes} {...rest} />
            <DateField source='createdAt' showTime />
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
