import React, { useEffect, useState } from 'react';

import {
  CloneButton,
  Datagrid,
  DateField,
  Edit,
  FormTab,
  GET_LIST,
  ListButton,
  ReferenceArrayInput,
  ReferenceField,
  ReferenceManyField,
  required,
  Responsive,
  SelectArrayInput,
  SimpleList,
  TabbedForm,
  TextField,
  TextInput,
  TopToolbar,
  useDataProvider,
} from 'react-admin';

import { constants, models } from 'stf-core';

import { withStyles } from '@material-ui/core/styles';

import ShowStatisticButton from '../matches/components/ShowStatisticButton';
import ContinueButton from '../matches/components/ContinueButton';
import TeamsMobileField from '../matches/components/TeamsMobileField';
import WinnerMobileField from '../matches/components/WinnerMobileField';
import { getPlayerId } from '../../utils/getPlayerId';

const styles = {
  fullWidth: {
    width: '100%',
  },
};

const EditActions = ({ basePath, data }) => (
  <TopToolbar>
    <ListButton basePath={basePath} />
    <CloneButton basePath={basePath} record={data} />
  </TopToolbar>
);

const TeamEdit = ({ classes, ...rest }) => {
  const [teams, setTeams] = useState([]);
  const [playerTeamsIds, setPlayerTeamsIds] = useState([]);
  const dataProvider = useDataProvider();

  useEffect(() => {
    const call = async () => {
      try {
        const teamsRes = await dataProvider(GET_LIST, constants.resources.teams, {
          filter: {},
        }).then((res) => res.data);
        setTeams(teamsRes);
        const playerTeamsRes = teamsRes.filter((team) =>
          team[models.teams.fields.players].includes(getPlayerId()),
        );
        setPlayerTeamsIds(playerTeamsRes.map((team) => team.id));
      } catch (e) {
        console.error(e);
      }
    };
    call();
  }, [dataProvider]);

  if (!playerTeamsIds || playerTeamsIds.length === 0) {
    return null;
  }

  return (
    <Edit {...rest} classes={classes} actions={<EditActions />} undoable={false} title="Team Edit">
      <TabbedForm redirect={false}>
        <FormTab label="summary">
          <TextField source="id" />
          <TextInput source={models.teams.fields.name} validate={required()} />
          <ReferenceArrayInput
            source={models.teams.fields.players}
            reference={constants.resources.players}
            validate={required()}
            label="Players"
            sort={{
              field: models.players.fields.email,
              order: 'ASC',
            }}
            filterToQuery={(searchText) => ({
              [`${models.players.fields.email}.$regex`]: searchText,
            })}
          >
            <SelectArrayInput optionText={models.players.fields.email} />
          </ReferenceArrayInput>
          <TextField source={models.teams.fields.invited} />
          <DateField showTime source="createdAt" />
          <DateField showTime source="updatedAt" />
        </FormTab>

        <FormTab label="Matches">
          <ReferenceManyField
            addLabel={false}
            reference={constants.resources.matches}
            className={classes.fullWidth}
            filter={{
              $or: [
                {
                  [models.matches.fields.teamA]: {
                    $in: playerTeamsIds,
                  },
                },
                {
                  [models.matches.fields.teamB]: {
                    $in: playerTeamsIds,
                  },
                },
              ],
            }}
            sort={{
              field: 'createdAt',
              order: 'DESC',
            }}
          >
            <Responsive
              small={
                <SimpleList
                  primaryText={(record) =>
                    record && <TeamsMobileField teams={teams} record={record} />
                  }
                  secondaryText={(record) =>
                    record && <WinnerMobileField teams={teams} record={record} />
                  }
                  tertiaryText={(record) =>
                    record && (
                      <>
                        <ContinueButton mobile classes={classes} record={record} {...rest} />
                        <ShowStatisticButton mobile classes={classes} record={record} {...rest} />
                      </>
                    )
                  }
                  linkType={false}
                />
              }
              medium={
                <Datagrid rowClick="show">
                  <ReferenceField
                    reference={constants.resources.teams}
                    source={models.matches.fields.teamA}
                  >
                    <TextField source={models.teams.fields.name} />
                  </ReferenceField>
                  <ReferenceField
                    reference={constants.resources.teams}
                    source={models.matches.fields.teamB}
                  >
                    <TextField source={models.teams.fields.name} />
                  </ReferenceField>
                  <TextField source={models.matches.fields.status} />
                  <ReferenceField
                    reference={constants.resources.teams}
                    source={models.matches.fields.winner}
                  >
                    <TextField source={models.teams.fields.name} />
                  </ReferenceField>
                  <DateField showTime source="createdAt" />
                </Datagrid>
              }
            />
          </ReferenceManyField>
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

export default withStyles(styles)(TeamEdit);
