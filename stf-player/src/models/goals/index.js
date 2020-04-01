import React, { useEffect, useState } from 'react'
import compose from 'recompose/compose'

import {
  Button,
  ChipField,
  DateField,
  FunctionField,
  GET_LIST,
  ReferenceField,
  Show,
  Tab,
  TabbedShowLayout,
  TextField,
  TopToolbar,
  withDataProvider
} from 'react-admin'

import { Typography, CircularProgress } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import ChevronLeft from '@material-ui/icons/ChevronLeft'

import { constants, models } from 'stf-core'

const styles = {
  replayFieldContainer: {
    margin: '1em 0'
  },
  replayFieldVideo: {
    margin: '1em 0 0 0.5em'
  },
  loadingAnimation: {
    height: '120px',
    width: '160px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

const goBack = history => history.goBack

const ShowActions = ({ history }) => (
  <TopToolbar>
    <Button
      color='primary'
      label='Back'
      onClick={goBack(history)}
    >
      <ChevronLeft />
    </Button>
  </TopToolbar>
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

const ReplayField = ({ record, classes }) => {
  const [isReplayLoading, setReplayLoading] = useState(false)

  const replayId = record[models.goals.fields.replay]

  if (!replayId) {
    return (
      <div className={classes.replayFieldContainer}>
        <Typography
          variant='caption'
        >
          Replay
          <div className={classes.replayFieldVideo}>
            This goal don't have replay
          </div>
        </Typography>
      </div>
    )
  }

  return (
    <div className={classes.replayFieldContainer}>
      <Typography
        variant='caption'
      >
        Replay
        <div className={classes.replayFieldVideo}>
          <video
            width='300'
            autoPlay
            loop
            onLoadStart={() => setReplayLoading(true)}
            onLoadedData={() => setReplayLoading(false)}
          >
            <source src={`https://drive.google.com/uc?id=${replayId}&export=download`} type='video/mp4' />
          </video>
          {
            isReplayLoading &&
            <div className={classes.loadingAnimation}>
              <CircularProgress size={50} />
            </div>
          }
        </div>
      </Typography>
    </div>
  )
}

const GoalShow = ({
  dataProvider,
  classes,
  history,
  ...rest
}) => {
  const [teams, setTeams] = useState([])

  useEffect(() => {
    const getTeams = async () => {
      try {
        let res = await dataProvider(GET_LIST, constants.resources.teams, {}).then(res => res.data)
        setTeams(res)
      } catch (e) {
        console.error(e)
      }
    }
    getTeams()
  }, [dataProvider])

  return (
    <Show
      {...rest}
      actions={<ShowActions history={history} />}
      title='Goal Show'
    >
      <TabbedShowLayout>
        <Tab
          label='summary'
        >
          <TextField source='id' />
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
          <ReplayField classes={classes} />
          <DateField source='createdAt' showTime />
          <DateField source='updatedAt' showTime />
        </Tab>
      </TabbedShowLayout>
    </Show>
  )
}

const enhance = compose(
  withStyles(styles),
  withDataProvider
)

export default enhance(GoalShow)
