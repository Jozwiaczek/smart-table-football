import React, { useCallback } from 'react';

import {
  Create,
  CREATE,
  ListButton,
  maxValue,
  minValue,
  number,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  Toolbar,
  TopToolbar,
  withDataProvider,
} from 'react-admin';

import { useFormState } from 'react-final-form';

import { Button, InputAdornment, withStyles } from '@material-ui/core';
import Casino from '@material-ui/icons/Casino';

import { constants, models } from 'stf-core';

import { getPlayerId } from '../../utils/getPlayerId';

const styles = () => ({
  toolbar: {
    justifyContent: 'space-between',
  },
});

const CreateActions = ({ basePath }) => (
  <TopToolbar>
    <ListButton basePath={basePath} />
  </TopToolbar>
);

const CreateMatchButton = ({ dataProvider, history, resource }) => {
  const formState = useFormState();

  const handleClick = useCallback(async () => {
    if (!formState.valid) {
      return;
    }

    const newMatch = await dataProvider(CREATE, resource, { data: formState.values });
    history.push({ pathname: '/inGame', search: `?match=${newMatch.data._id}` });
  }, [dataProvider, history, resource, formState.valid, formState.values]);

  return (
    <Button variant="contained" color="secondary" onClick={handleClick}>
      <Casino />
      &nbsp;&nbsp;Start New Match
    </Button>
  );
};

const CreateToolbar = withStyles(styles)(({ history, dataProvider, classes, ...props }) => (
  <Toolbar {...props} className={classes.toolbar}>
    <CreateMatchButton history={history} dataProvider={dataProvider} />
  </Toolbar>
));

const TeamSelect = ({ type, choices, ...rest }) => {
  const filteredChoices = choices.filter((choice) => {
    const isUserTeam = choice[models.teams.fields.players].includes(getPlayerId());
    if (type === 'own') {
      return isUserTeam;
    }
    if (type === 'opponent') {
      return !isUserTeam;
    }
    return null;
  });
  return <SelectInput optionText={models.teams.fields.name} choices={filteredChoices} {...rest} />;
};

const MatchCreate = (props) => (
  <Create {...props} actions={<CreateActions />} title="Match Create">
    <SimpleForm toolbar={<CreateToolbar {...props} />}>
      <ReferenceInput
        source={models.matches.fields.teamA}
        reference={constants.resources.teams}
        validate={required()}
        label="Your Team"
        sort={{
          field: models.teams.fields.name,
          order: 'ASC',
        }}
      >
        <TeamSelect type="own" />
      </ReferenceInput>

      <ReferenceInput
        source={models.matches.fields.teamB}
        reference={constants.resources.teams}
        validate={[required()]}
        label="Opponent Team"
        sort={{
          field: models.teams.fields.name,
          order: 'ASC',
        }}
      >
        <TeamSelect type="opponent" />
      </ReferenceInput>

      <NumberInput
        source={models.matches.fields.replayTime}
        validate={[required(), minValue(4), maxValue(10), number()]}
        defaultValue={4}
        options={{
          InputProps: {
            endAdornment: <InputAdornment position="start">seconds</InputAdornment>,
          },
        }}
      />
    </SimpleForm>
  </Create>
);

export default withDataProvider(MatchCreate);
