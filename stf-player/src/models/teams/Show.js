import React from 'react';

import {
  DateField,
  ListButton,
  ReferenceField,
  Show,
  Tab,
  TabbedShowLayout,
  TextField,
  TopToolbar,
} from 'react-admin';

import { constants, models } from 'stf-core';

import { withStyles } from '@material-ui/core/styles';

import DecisionField from './elements/DecisionInvitationButton';

const styles = {
  fullWidth: {
    width: '100%',
  },
};

const Actions = ({ basePath }) => (
  <TopToolbar>
    <ListButton basePath={basePath} />
  </TopToolbar>
);

// TODO: Show only when it is pending
// TODO: Provide actions
const TeamShow = (props) => (
  <Show {...props} actions={<Actions />} title="Team Show">
    <TabbedShowLayout>
      <Tab label="summary">
        <TextField source={models.teams.fields.name} />
        <ReferenceField
          source={models.teams.fields.players}
          reference={constants.resources.players}
          label="Players"
          sort={{
            field: models.players.fields.email,
            order: 'ASC',
          }}
        >
          <TextField source={models.players.fields.email} />
        </ReferenceField>
        <DateField showTime source="createdAt" />
        <DateField showTime source="updatedAt" />
        <DecisionField />
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export default withStyles(styles)(TeamShow);
