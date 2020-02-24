import React, { useCallback } from 'react'

import {
  Create,
  SimpleForm,
  TopToolbar,
  ListButton,
  required,
  SelectInput,
  ReferenceInput,
  NumberInput,
  number,
  minValue,
  maxValue,
  Toolbar,
  withDataProvider,
  CREATE,
  useRedirect,
  useNotify
} from 'react-admin'

import { useFormState, useForm } from 'react-final-form'

import {
  InputAdornment,
  withStyles,
  Button
} from '@material-ui/core'
import Casino from '@material-ui/icons/Casino'

import {
  constants,
  models
} from 'stf-core'
import { getPlayerId } from '../../utils/getPlayerId'

const styles = () => ({
  toolbar: {
    justifyContent: 'space-between'
  }
})

const CreateActions = ({ basePath }) => (
  <TopToolbar>
    <ListButton basePath={basePath} />
  </TopToolbar>
)

const CreateMatchButton = ({ dataProvider, history, ...props }) => {
  const redirectTo = useRedirect()
  const notify = useNotify()
  const { redirect, basePath } = props

  const form = useForm()
  const formState = useFormState()

  const handleClick = useCallback(async () => {
    if (!formState.valid) {
      return
    }

    const newMatch = await dataProvider(CREATE, props.resource, { data: formState.values })
    history.push({ pathname: '/inGame', search: `?match=${newMatch.data._id}` })
  }, [
    formState.valid,
    formState.values,
    notify,
    redirectTo,
    redirect,
    basePath
  ])

  return (
    <Button
      variant={'contained'}
      color={'secondary'}
      onClick={handleClick}
    >
      <Casino />&nbsp;&nbsp;Start New Match
    </Button>
  )
}

const CreateToolbar = withStyles(styles)(({ history, dataProvider, classes, ...props }) => (
  <Toolbar {...props} className={classes.toolbar}>
    <CreateMatchButton
      history={history}
      dataProvider={dataProvider}
    />
  </Toolbar>
))

const TeamSelect = ({ type, choices, ...rest }) => {
  let filteredChoices = choices.filter(choice => {
    const isUserTeam = choice[models.teams.fields.players].includes(getPlayerId())
    if (type === 'own') {
      return isUserTeam
    } else if (type === 'opponent') {
      return !isUserTeam
    }
  })
  return (
    <SelectInput optionText={models.teams.fields.name} choices={filteredChoices} {...rest} />
  )
}

const MatchCreate = (props) => (
  <Create
    {...props}
    actions={<CreateActions />}
    title={'Match Create'}
  >
    <SimpleForm toolbar={<CreateToolbar {...props} />}>
      <ReferenceInput
        source={models.matches.fields.teamA}
        reference={constants.resources.teams}
        validate={required()}
        label={'Your Team'}
        sort={{
          field: models.teams.fields.name,
          order: 'ASC'
        }}
      >
        <TeamSelect type={'own'} />
      </ReferenceInput>

      <ReferenceInput
        source={models.matches.fields.teamB}
        reference={constants.resources.teams}
        validate={[required()]}
        label={'Opponent Team'}
        sort={{
          field: models.teams.fields.name,
          order: 'ASC'
        }}
      >
        <TeamSelect type={'opponent'} />
      </ReferenceInput>

      <NumberInput
        source={models.matches.fields.replayTime}
        validate={[required(), minValue(4), maxValue(10), number()]}
        defaultValue={4}
        options={{
          InputProps: {
            endAdornment: <InputAdornment position={'start'}>
              seconds
            </InputAdornment>
          }
        }}
      />
    </SimpleForm>
  </Create>
)

export default withDataProvider(MatchCreate)
