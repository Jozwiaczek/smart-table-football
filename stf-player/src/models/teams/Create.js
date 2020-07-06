import React, { useEffect, useState } from 'react'
import { Field, Form } from 'react-final-form'
import { Button, CardActions, CardContent, CircularProgress, MenuItem } from '@material-ui/core'
import { Create, CREATE, GET_LIST, GET_ONE, ListButton, TopToolbar, useDataProvider, useNotify } from 'react-admin'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

import { constants, models } from 'stf-core'
import FormTextField from '../../elements/forms/FormTextField'
import { getPlayerId } from '../../utils/getPlayerId'

const useStyles = makeStyles({
  cardContent: {
    padding: '3rem 5rem',
    display: 'flex',
    justifyContent: 'space',
    flexDirection: 'column'
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'start'
  },
  halfInputContainerV: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '3em',
    height: '4em'
  },
  halfInput: {
    marginBottom: '1.5em',
    height: '4em',
    width: '40%'
  },
  lastInput: {
    height: '4em'
  },
  button: {
    margin: '1rem 5rem'
  },
  loadingBar: {
    marginRight: 8
  },
  linkToLog: {
    marginTop: 6
  },
  rootLoading: {
    width: '100%',
    height: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const CreateActions = ({ basePath }) => (
  <TopToolbar>
    <ListButton basePath={basePath} />
  </TopToolbar>
)

const validateForm = (values) => {
  const errors = {}

  if (!values[models.teams.fields.name]) {
    errors[models.teams.fields.name] = 'Required'
  }
  if (!values[models.teams.fields.players]) {
    errors[models.teams.fields.players] = 'Required'
  }

  return errors
}

const getPlayersMenuItems = (values, players) =>
  players.map((player, key) =>
    <MenuItem key={key} value={player._id}>
      {player[models.players.fields.email]}
    </MenuItem>
  )

const TeamCreate = props => {
  const [loading, setLoading] = useState(false)
  const classes = useStyles()
  const dataProvider = useDataProvider()
  const [players, setPlayers] = React.useState([])
  const [currPlayer, setCurrPlayer] = React.useState([])
  const notify = useNotify()
  const history = useHistory()

  useEffect(() => {
    const req = async () => {
      const currPlayer = (await dataProvider(GET_ONE, constants.resources.players, { id: getPlayerId() })).data
      setCurrPlayer(currPlayer)
      const resPlayers = (await dataProvider(GET_LIST, constants.resources.players, { filter: {} })).data
      setPlayers(resPlayers.filter(player => player[models.players.fields.email] !== currPlayer[models.players.fields.email]))
    }
    req()
  }, [])

  const createTeam = async values => {
    setLoading(true)
    values.players = [values.players, currPlayer._id]
    try {
      const createdTeam = await dataProvider(CREATE, constants.resources.teams, { data: values })
      history.push(`/teams/${createdTeam.data.id}`)
    } catch (error) {
      notify(
        typeof error === 'string'
          ? error
          : typeof error === 'undefined' || !error.message
            ? 'Error with creating team'
            : error.message,
        'warning'
      )
    } finally {
      setLoading(false)
    }
  }

  if (!Array.isArray(players)) {
    return (
      <div className={classes.rootLoading}>
        <CircularProgress size={60} />
      </div>
    )
  }

  return (
    <Create
      {...props}
      actions={<CreateActions />}
      title='Team Create'
    >
      <Form
        onSubmit={createTeam}
        validate={validateForm}
        render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <CardContent className={classes.cardContent}>
              <div className={classes.halfInputContainerV}>
                <Field
                  autoFocus
                  id={models.teams.fields.name}
                  name={models.teams.fields.name}
                  component={FormTextField}
                  label={'Team name'}
                  className={classes.halfInput}
                  disabled={loading}
                  required
                />

                <Field
                  id={models.teams.fields.players}
                  name={models.teams.fields.players}
                  select
                  required
                  component={FormTextField}
                  label='Team Mate'
                  disabled={loading}
                  className={classes.halfInput}
                >
                  {getPlayersMenuItems(values, players)}
                </Field>
              </div>
            </CardContent>

            <CardActions className={classes.cardActions}>
              <Button
                variant='contained'
                type='submit'
                color='primary'
                disabled={loading}
                className={classes.button}
              >
                {
                  loading &&
                  <div className={classes.loadingBar} >
                    <CircularProgress size={15} thickness={2} />
                  </div>
                }
                Create Team
              </Button>
            </CardActions>
          </form>
        )}
      />
    </Create>
  )
}

export default TeamCreate
