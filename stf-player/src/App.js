/* global localStorage */
import React, { useEffect } from 'react'
import { Admin, GET_ONE, Resource, useDataProvider, useSetLocale } from 'react-admin'
import { useDispatch } from 'react-redux'

import { authClient } from 'ra-data-feathers'

import Person from '@material-ui/icons/Person'
import Group from '@material-ui/icons/Group'
import Casino from '@material-ui/icons/Casino'

import { constants, models } from 'stf-core'

import feathersRestClient from './client/feathersRestClient'
import customReducers from './redux/reducers'
import dataProvider from './dataProvider'
import i18nProvider from './i18n/i18nProvider'
import { getPlayerId } from './utils/getPlayerId'
import Layout from './elements/layout'

import { PlayerEdit } from './models/players'

import { TeamCreate, TeamEdit, TeamsList } from './models/teams'

import { MatchCreate, MatchEdit, MatchList } from './models/matches'

import GoalShow from './models/goals'
import Dashboard from './routes/dashboard'
import customRoutes from './customRoutes'
import Login from './routes/auth/login/Login'
import { socket } from './client/feathersSocketClient'
import { setTableAvailability, setTableStatus } from './redux/actions/table'
import { setTheme } from './redux/actions/theme'

const authClientOptions = {
  storageKey: constants.storageKey, // The key in localStorage used to store the authentication token
  authenticate: { // Options included in calls to Feathers client.authenticate
    strategy: constants.userEntities.player // The authentication strategy Feathers should use
  },
  permissionsKey: 'permissions', // The key in localStorage used to store permissions from decoded JWT
  permissionsField: 'roles', // The key in the decoded JWT containing the user's role
  passwordField: 'password', // The key used to provide the password to Feathers client.authenticate
  usernameField: 'email', // The key used to provide the username to Feathers client.authenticate
  redirectTo: '/login' // Redirect to this path if an AUTH_CHECK fails. Uses the react-admin default of '/login' if omitted.
}

const GetPlayer = () => {
  const setLocale = useSetLocale()
  const dataProvider = useDataProvider()
  const dispatch = useDispatch()

  useEffect(() => {
    let themeMode = localStorage.getItem(constants.themeMode.name)
    if (!themeMode) {
      themeMode = constants.themeMode.type.light
      localStorage.setItem(constants.themeMode.name, themeMode)
    }
    dispatch(setTheme(themeMode))

    const token = localStorage.getItem(constants.storageKey)
    const getter = async () => {
      const resPlayer = await dataProvider(GET_ONE, constants.resources.players, { id: getPlayerId() }).then(res => res.data)
      setLocale(resPlayer[models.players.fields.locale])

      socket.emit(constants.socketEvents.isTableActivePlayer)
      socket.on(constants.socketEvents.isTableActivePlayer, isActive => dispatch(setTableStatus(isActive)))

      socket.emit(constants.socketEvents.isTableInGame)
      socket.on(constants.socketEvents.isTableInGame, isInGame => dispatch(setTableAvailability(isInGame)))
    }
    if (token) {
      getter()
    }
  }, [dataProvider, setLocale, dispatch])
  return null
}

const App = () => (
  <Admin
    title='STF Player Panel'
    dataProvider={dataProvider}
    authProvider={authClient(feathersRestClient, authClientOptions)}
    // customSagas={[tableSaga]}
    customReducers={customReducers}
    i18nProvider={i18nProvider}
    customRoutes={customRoutes}
    dashboard={Dashboard}
    loginPage={Login}
    layout={Layout}
  >
    <Resource
      name={constants.resources.playerAuthManagement}
    />
    <Resource
      name={constants.resources.players}
      icon={Person}
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
      show={GoalShow}
    />
    <GetPlayer />
  </Admin>
)

export default App
