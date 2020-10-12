import React, { useEffect } from 'react';
import { Admin, GET_ONE, Resource, useDataProvider, useLogout, useSetLocale } from 'react-admin';
import { useDispatch } from 'react-redux';

import { authClient } from 'ra-data-feathers';

import { constants, models } from 'stf-core';

import feathersRestClient from './client/feathersRestClient';
import customReducers from './redux/reducers';
import dataProvider from './dataProvider';
import i18nProvider from './i18n/i18nProvider';
import { getPlayerId } from './utils/getPlayerId';
import Layout from './layout';

import { PlayerEdit } from './models/players';

import { TeamCreate, TeamEdit, TeamShow, TeamsList } from './models/teams';

import { MatchCreate, MatchEdit, MatchList } from './models/matches';

import GoalShow from './models/goals';
import Dashboard from './routes/dashboard';
import customRoutes from './customRoutes';
import Login from './routes/auth/login/Login';
import { socket } from './client/feathersSocketClient';
import { setTableAvailability, setTableStatus } from './redux/actions/table';
import { setTheme } from './redux/actions/theme';
import { NotificationsList } from './models/notifications';
import useLocalStorage from './hooks/useLocalStorage';

const authClientOptions = {
  storageKey: constants.storageKey, // The key in localStorage used to store the authentication token
  authenticate: {
    // Options included in calls to Feathers client.authenticate
    strategy: constants.userEntities.player, // The authentication strategy Feathers should use
  },
  permissionsKey: 'permissions', // The key in localStorage used to store permissions from decoded JWT
  permissionsField: 'roles', // The key in the decoded JWT containing the user's role
  passwordField: 'password', // The key used to provide the password to Feathers client.authenticate
  usernameField: 'email', // The key used to provide the username to Feathers client.authenticate
  redirectTo: '/login', // Redirect to this path if an AUTH_CHECK fails. Uses the react-admin default of '/login' if omitted.
};

const GetPlayer = () => {
  const setLocale = useSetLocale();
  const dataProvider = useDataProvider();
  const dispatch = useDispatch();
  const [themeMode] = useLocalStorage(constants.themeMode.name, constants.themeMode.type.light);
  const [token] = useLocalStorage(constants.storageKey);
  const logout = useLogout();

  useEffect(() => {
    dispatch(setTheme(themeMode));

    const getter = async () => {
      const resPlayer = await dataProvider(GET_ONE, constants.resources.players, {
        id: getPlayerId(),
      }).then((res) => res.data);
      setLocale(resPlayer[models.players.fields.locale]);

      socket.emit(constants.socketEvents.isTableActivePlayer);
      socket.on(constants.socketEvents.isTableActivePlayer, (isActive) =>
        dispatch(setTableStatus(isActive)),
      );

      socket.emit(constants.socketEvents.isTableInGame);
      socket.on(constants.socketEvents.isTableInGame, (isInGame) =>
        dispatch(setTableAvailability(isInGame)),
      );
    };
    if (token) {
      getter();
    }
  }, [dataProvider, setLocale, dispatch, themeMode, token, logout]);
  return null;
};

const App = () => (
  <Admin
    title="STF Player Panel"
    dataProvider={dataProvider}
    authProvider={authClient(feathersRestClient, authClientOptions)}
    customReducers={customReducers}
    i18nProvider={i18nProvider}
    customRoutes={customRoutes}
    dashboard={Dashboard}
    loginPage={Login}
    layout={Layout}
  >
    <Resource name={constants.resources.playerAuthManagement} />
    <Resource name={constants.resources.players} edit={PlayerEdit} />
    <Resource
      name={constants.resources.teams}
      list={TeamsList}
      create={TeamCreate}
      edit={TeamEdit}
      show={TeamShow}
    />
    <Resource
      name={constants.resources.matches}
      list={MatchList}
      create={MatchCreate}
      edit={MatchEdit}
    />
    <Resource name={constants.resources.goals} show={GoalShow} />
    <Resource name={constants.resources.notifications} list={NotificationsList} />
    <GetPlayer />
  </Admin>
);

export default App;
