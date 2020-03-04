import React from 'react'

import {
  DateField,
  TextField,
  Edit,
  TopToolbar,
  ListButton,
  CloneButton,
  TabbedForm,
  FormTab,
  required,
  ReferenceInput,
  SelectInput,
  NumberInput,
  number,
  minValue,
  maxValue,
  Datagrid,
  ReferenceManyField,
  ReferenceField,
  FunctionField
} from 'react-admin'

import {
  InputAdornment
} from '@material-ui/core'

import { withStyles } from '@material-ui/core/styles'

import {
  constants,
  models
} from 'stf-core'
import { getChoices } from '../../enum'
import { getTimerUnit } from '../../utils/getTimerUnits'

const styles = {
  fullWidth: {
    width: '100%'
  }
}

const EditActions = ({ basePath, data }) => (
  <TopToolbar>
    <ListButton basePath={basePath} />
    <CloneButton basePath={basePath} record={data} />
  </TopToolbar>
)

const MatchEdit = props => (
  <Edit
    {...props}
    actions={<EditActions />}
    undoable={false}
    title='Match Edit'
  >
    <TabbedForm
      redirect={false}
    >
      <FormTab
        label='summary'
      >
        <TextField source='id' />
        <ReferenceInput
          source={models.matches.fields.teamA}
          reference={constants.resources.teams}
          validate={required()}
          label='Team A'
          sort={{
            field: models.teams.fields.name,
            order: 'ASC'
          }}
        >
          <SelectInput optionText={models.teams.fields.name} />
        </ReferenceInput>
        <ReferenceInput
          source={models.matches.fields.teamB}
          reference={constants.resources.teams}
          validate={required()}
          label='Team B'
          sort={{
            field: models.teams.fields.name,
            order: 'ASC'
          }}
        >
          <SelectInput optionText={models.teams.fields.name} />
        </ReferenceInput>
        <SelectInput
          source={models.matches.fields.status}
          choices={getChoices(constants.statusMatch)}
          validate={required()}
        />
        <NumberInput
          source={models.matches.fields.replayTime}
          validate={[required(), minValue(4), maxValue(10), number()]}
          default={7}
          options={{
            InputProps: {
              endAdornment: <InputAdornment position='start'>
                  seconds
              </InputAdornment>
            }
          }}
        />
        <FunctionField
          label='Elapsed Time' render={record => {
            const elapsedTime = record[models.matches.fields.elapsedTime]
            return (
              `${getTimerUnit(elapsedTime).min}:${getTimerUnit(elapsedTime).sec}`
            )
          }}
        />
        <DateField source='createdAt' showTime />
        <DateField source='updatedAt' showTime />
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

      <FormTab
        label='test'
      >
        <p>test</p>
      </FormTab>
    </TabbedForm>
  </Edit>
)

export default withStyles(styles)(MatchEdit)
