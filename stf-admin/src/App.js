/* global localStorage */
import React, { useEffect } from 'react';
import { Admin, GET_ONE, Resource, withDataProvider } from 'react-admin';
import { authClient } from 'ra-data-feathers';
import englishMessages from 'ra-language-english';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import Person from '@material-ui/icons/Person';
import PersonOutline from '@material-ui/icons/PersonOutline';
import Group from '@material-ui/icons/Group';
import Casino from '@material-ui/icons/Casino';
import SportsSoccer from '@material-ui/icons/SportsSoccer';
import TableSignal from '@material-ui/icons/SettingsInputAntenna';
import EmailIcon from '@material-ui/icons/Email';

import { constants } from 'stf-core';

import feathersRestClient from './client/feathersRestClient';
import dataProvider from './dataProvider';
import domainMessages from './i18n';
import { defaultTheme } from './themes';
import { getAdminId } from './utils/getAdminId';

import { AdminCreate, AdminEdit, AdminsList } from './models/users/admins';
import { PlayerCreate, PlayerEdit, PlayersList } from './models/users/players';
import { TeamCreate, TeamEdit, TeamsList } from './models/teams';
import { MatchCreate, MatchEdit, MatchList } from './models/matches';
import { GoalShow, GoalsList } from './models/goals';
import { MailerCreate } from './models/mailer';
import { TableList } from './models/table';

const authClientOptions = {
  storageKey: constants.storageKey, // The key in localStorage used to store the authentication token
  authenticate: {
    // Options included in calls to Feathers client.authenticate
    strategy: constants.userEntities.admin, // The authentication strategy Feathers should use
  },
  permissionsKey: 'permissions', // The key in localStorage used to store permissions from decoded JWT
  permissionsField: 'roles', // The key in the decoded JWT containing the user's role
  passwordField: 'password', // The key used to provide the password to Feathers client.authenticate
  usernameField: 'email', // The key used to provide the username to Feathers client.authenticate
  redirectTo: '/login', // Redirect to this path if an AUTH_CHECK fails. Uses the react-admin default of '/login' if omitted.
};

// const realTimeSaga = createRealtimeSaga(dataProvider)

const messages = {
  en: {
    ...englishMessages,
    ...domainMessages.en,
  },
};

const i18nProvider = polyglotI18nProvider((locale) => messages[locale], 'en');

const GetAdmin = withDataProvider((props) => {
  useEffect(() => {
    const token = localStorage.getItem(constants.storageKey);
    if (token) {
      props.dataProvider(GET_ONE, constants.resources.admins, { id: getAdminId() });
    }
  });
  return null;
});

const App = () => (
  <Admin
    title="STF Admin Panel"
    dataProvider={dataProvider}
    authProvider={authClient(feathersRestClient, authClientOptions)}
    i18nProvider={i18nProvider}
    theme={defaultTheme}
  >
    <Resource
      name={constants.resources.admins}
      icon={PersonOutline}
      list={AdminsList}
      create={AdminCreate}
      edit={AdminEdit}
    />
    <Resource
      name={constants.resources.players}
      icon={Person}
      list={PlayersList}
      create={PlayerCreate}
      edit={PlayerEdit}
    />
    <Resource
      name={constants.resources.teams}
      icon={Group}
      list={TeamsList}
      create={TeamCreate}
      edit={TeamEdit}
    />
    <Resource
      name={constants.resources.matches}
      icon={Casino}
      list={MatchList}
      create={MatchCreate}
      edit={MatchEdit}
    />
    <Resource
      name={constants.resources.goals}
      icon={SportsSoccer}
      list={GoalsList}
      show={GoalShow}
    />
    <Resource name={constants.resources.table} icon={TableSignal} list={TableList} />
    <Resource name={constants.resources.mailer} icon={EmailIcon} create={MailerCreate} />
    <GetAdmin />
  </Admin>
);

export default App;
