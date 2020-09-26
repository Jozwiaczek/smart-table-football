import React from 'react';

import {
  DateField,
  TextInput,
  TextField,
  Edit,
  TopToolbar,
  ListButton,
  CloneButton,
  TabbedForm,
  FormTab,
  required,
  ReferenceArrayInput,
  SelectArrayInput,
  ReferenceManyField,
  Datagrid,
  ReferenceField,
} from 'react-admin';

import { constants, models } from 'stf-core';

import { withStyles } from '@material-ui/core/styles';

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

const TeamEdit = ({ classes, ...rest }) => (
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
          sort={{
            field: 'createdAt',
            order: 'DESC',
          }}
        >
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
        </ReferenceManyField>
      </FormTab>
    </TabbedForm>
  </Edit>
);

export default withStyles(styles)(TeamEdit);
