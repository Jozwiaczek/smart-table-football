import React, { useEffect, useState } from 'react'
import compose from 'recompose/compose'

import {
  DateField,
  TextField,
  Edit,
  TopToolbar,
  ListButton,
  TabbedForm,
  FormTab,
  Datagrid,
  ReferenceManyField,
  ReferenceField,
  withDataProvider,
  GET_ONE, FunctionField
} from 'react-admin'

import {
  Typography
} from '@material-ui/core'

import { withStyles } from '@material-ui/core/styles'

import {
  constants,
  models
} from 'stf-core'
import { getTimerUnit } from '../../utils/getTimerUnits'

const styles = {
  fullWidth: {
    width: '100%'
  }
}

const EditActions = ({ basePath }) => (
  <TopToolbar>
    <ListButton basePath={basePath} />
  </TopToolbar>
)

const CustomTextField = ({ label, header }) => (
  <div style={{ marginBottom: '0.5em' }}>
    <Typography
      variant='caption'
    >
      <p style={{ color: 'rgba(0, 0, 0, 0.54)', marginBlockEnd: 0 }}>{header}</p>
      <Typography>{label}</Typography>
    </Typography>
  </div>
)

const Teams = ({ teamA, teamB, classes }) => {
  if (!teamA || !teamB) {
    return null
  }

  return (
    <div>
      <CustomTextField classes={classes} label={teamA[models.teams.fields.name]} header='Team A' />
      <CustomTextField classes={classes} label={teamB[models.teams.fields.name]} header='Team B' />
    </div>
  )
}

const MatchEdit = ({ dataProvider, ...props }) => {
  const [teamA, setTeamA] = useState(null)
  const [teamB, setTeamB] = useState(null)
  const [match, setMatch] = useState(null)

  useEffect(() => {
    const getTeams = async () => {
      if (match) {
        setTeamA(await dataProvider(GET_ONE, constants.resources.teams, { id: match[models.matches.fields.teamA] })
          .then(result => result.data))

        setTeamB(await dataProvider(GET_ONE, constants.resources.teams, { id: match[models.matches.fields.teamB] })
          .then(result => result.data))
      }
    }
    getTeams()
  }, [match, dataProvider])

  const SetCurrentMatch = ({ record }) => {
    setMatch(record)
    return null
  }

  return (
    <Edit
      {...props}
      actions={<EditActions />}
      undoable={false}
      title={teamA && teamB ? `Match | ${teamA[models.teams.fields.name]} vs ${teamB[models.teams.fields.name]}` : 'Match'}
    >
      <TabbedForm
        redirect={false}
      >
        <FormTab
          label='summary'
        >
          <Teams teamA={teamA} teamB={teamB} classes={props.classes} />

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

        </FormTab>

        <FormTab
          label='goals'
        >
          <ReferenceManyField
            addLabel={false}
            reference={constants.resources.goals}
            target={models.goals.fields.match}
            className={props.classes.fullWidth}
            sort={{
              field: 'createdAt',
              order: 'DESC'
            }}
          >
            <Datagrid
              rowClick='show'
            >
              <ReferenceField
                source={models.goals.fields.team}
                reference={constants.resources.teams}
              >
                <TextField source={models.teams.fields.name} />
              </ReferenceField>
              <DateField source='createdAt' showTime />
            </Datagrid>
          </ReferenceManyField>
        </FormTab>
        <SetCurrentMatch />
      </TabbedForm>
    </Edit>
  )
}
const enhance = compose(
  withStyles(styles),
  withDataProvider
)

export default enhance(MatchEdit)
