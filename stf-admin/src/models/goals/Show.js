import React from 'react'
import compose from 'recompose/compose'

import {
  DateField,
  TextField,
  Show,
  TopToolbar,
  ListButton,
  ReferenceField,
  FunctionField,
  ChipField,
  withDataProvider,
  TabbedShowLayout,
  Tab
} from 'react-admin'

import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import {
  constants,
  models
} from 'stf-core'

const styles = {
  replayFieldContainer: {
    margin: '1em 0'
  },
  replayFieldVideo: {
    margin: '1em 0 0 0.5em'
  }
}

const ShowActions = ({ basePath }) => (
  <TopToolbar>
    <ListButton basePath={basePath} />
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
          <video width='300' autoPlay loop>
            <source src={`https://drive.google.com/uc?id=${replayId}&export=download`} type='video/mp4' />
          </video>
        </div>
      </Typography>
    </div>
  )
}

const GoalShow = ({
  dataProvider,
  classes,
  ...rest
}) => {
  const [teams, setTeams] = React.useState([])

  React.useEffect(() => {
    const getTeams = async () => {
      setTeams(await dataProvider('GET_LIST', constants.resources.teams, {})
        .then(result => result.data))
    }
    getTeams()
  }, [dataProvider])

  return (
    <Show
      {...rest}
      actions={<ShowActions />}
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
