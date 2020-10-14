import React, { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { Button, CardActions, CardContent, CircularProgress } from '@material-ui/core';
import {
  Create,
  CREATE,
  GET_LIST,
  ListButton,
  TopToolbar,
  useDataProvider,
  useNotify,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import { constants, models } from 'stf-core';

import FormTextField from '../../elements/forms/FormTextField';
import { getPlayerId } from '../../utils/getPlayerId';
import TeamMateCreateField from './elements/TeamMateCreateField';

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: '3rem 5rem',
    display: 'flex',
    justifyContent: 'space',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      padding: '3rem 0 3rem 3rem',
    },
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'start',
  },
  halfInputContainerV: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '3em',
    height: '4em',
  },
  halfInput: {
    marginBottom: '1.5em',
    height: '4em',
    width: '40%',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
  },
  button: {
    margin: '1rem 5rem',
    [theme.breakpoints.down('sm')]: {
      margin: '1rem 0 1rem 2.5rem',
    },
  },
  loadingBar: {
    marginRight: 8,
  },
  rootLoading: {
    width: '100%',
    height: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const CreateActions = ({ basePath }) => (
  <TopToolbar>
    <ListButton basePath={basePath} />
  </TopToolbar>
);

const validateForm = (values, players) => {
  const errors = {};

  if (!values[models.teams.fields.name]) {
    errors[models.teams.fields.name] = 'Required';
  }
  if (!values[models.teams.fields.invited]) {
    errors[models.teams.fields.invited] = 'Required';
  } else if (
    !players.find(
      (player) => player[models.players.fields.email] === values[models.teams.fields.invited],
    )
  ) {
    errors.providedInvited = 1;
    errors[models.teams.fields.invited] = 'Provided player doesnt have account in stf';
  }

  return errors;
};

const TeamCreate = (props) => {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const dataProvider = useDataProvider();
  const [players, setPlayers] = React.useState([]);
  const [currPlayer, setCurrPlayer] = React.useState([]);
  const notify = useNotify();
  const history = useHistory();

  useEffect(() => {
    const req = async () => {
      const resPlayers = (await dataProvider(GET_LIST, constants.resources.players, { filter: {} }))
        .data;
      setCurrPlayer(resPlayers.find((player) => player.id === getPlayerId()));
      setPlayers(
        resPlayers.filter(
          (player) =>
            player[models.players.fields.email] !== currPlayer[models.players.fields.email],
        ),
      );
    };
    req();
  }, [currPlayer, dataProvider]);

  const createTeam = async (values) => {
    setLoading(true);
    const invited = players.find(
      (player) => player[models.players.fields.email] === values[models.teams.fields.invited],
    )._id;
    try {
      const createdTeam = await dataProvider(CREATE, constants.resources.teams, {
        data: { ...values, invited, players: [currPlayer._id] },
      });
      history.push(`/teams/${createdTeam.data.id}`);
    } catch (error) {
      notify(
        typeof error === 'string'
          ? error
          : typeof error === 'undefined' || !error.message
          ? 'Error with creating team'
          : error.message,
        'warning',
      );
    } finally {
      setLoading(false);
    }
  };

  if (!Array.isArray(players)) {
    return (
      <div className={classes.rootLoading}>
        <CircularProgress size={60} />
      </div>
    );
  }

  return (
    <Create {...props} actions={<CreateActions />} title="Team Create">
      <Form
        validate={(values) => validateForm(values, players)}
        render={({ handleSubmit, values, ...rest }) => (
          <form noValidate onSubmit={handleSubmit}>
            <CardContent className={classes.cardContent}>
              <div className={classes.halfInputContainerV}>
                <Field
                  autoFocus
                  required
                  id={models.teams.fields.name}
                  name={models.teams.fields.name}
                  component={FormTextField}
                  label="Team name"
                  className={classes.halfInput}
                  disabled={loading}
                />

                <TeamMateCreateField
                  loading={loading}
                  currentValue={values[models.teams.fields.invited]}
                  players={players}
                  {...rest}
                />
              </div>
            </CardContent>

            <CardActions className={classes.cardActions}>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                disabled={loading}
                className={classes.button}
              >
                {loading && (
                  <div className={classes.loadingBar}>
                    <CircularProgress size={15} thickness={2} />
                  </div>
                )}
                Create Team
              </Button>
            </CardActions>
          </form>
        )}
        onSubmit={createTeam}
      />
    </Create>
  );
};

export default TeamCreate;
