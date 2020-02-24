/* global localStorage */
import React from 'react'
import { Admin, Resource, withDataProvider, GET_ONE } from 'react-admin'
import { authClient } from 'ra-data-feathers'
import englishMessages from 'ra-language-english'
import polyglotI18nProvider from 'ra-i18n-polyglot'

import Person from '@material-ui/icons/Person'
import Group from '@material-ui/icons/Group'
import Casino from '@material-ui/icons/Casino'
import { MuiThemeProvider } from '@material-ui/core'

import { constants } from 'stf-core'

import feathersRestClient from './client/feathersRestClient'
import dataProvider from './dataProvider'
import domainMessages from './i18n'
import { themeProvider } from './themes'
import { getPlayerId } from './utils/getPlayerId'

import { PlayerEdit } from './models/players'

import {
  TeamsList,
  TeamCreate,
  TeamEdit
} from './models/teams'

import {
  MatchList,
  MatchCreate,
  MatchEdit
} from './models/matches'

import GoalShow from './models/goals'

import Menu from './containers/Menu'
import Dashboard from './routes/dashboard'
import customRoutes from './customRoutes'
import Login from './routes/auth/login/Login'

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

// const realTimeSaga = createRealtimeSaga(dataProvider)

const messages = {
  en: {
    ...englishMessages,
    ...domainMessages.en
  }
}

const i18nProvider = polyglotI18nProvider(locale => messages[locale], 'en')

const GetPlayer = withDataProvider((props) => {
  React.useEffect(() => {
    const token = localStorage.getItem(constants.storageKey)
    if (token) {
      props.dataProvider(GET_ONE, constants.resources.players, { id: getPlayerId() })
    }
  })
  return null
})

const App = () => {
  const [theme, themeSetter] = React.useState(null)
  const [themeLoading, themeLoadingSetter] = React.useState(true)

  React.useEffect(() => {
    const call = async () => {
      try {
        const theme = await themeProvider()
        await themeSetter(theme)
      } catch (e) {
        throw new Error(e)
      }
      await themeLoadingSetter(false)
    }
    call()
  }, [])

  if (!theme && !themeLoading) {
    return <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
    >
      <div style={{
        width: 200,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        padding: 50
      }}
      >
        Theme could not be loaded
      </div>
    </div>
  }

  if (!theme) {
    return null
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Admin
        title='STF Player Panel'
        dataProvider={dataProvider}
        authProvider={authClient(feathersRestClient, authClientOptions)}
        i18nProvider={i18nProvider}
        customRoutes={customRoutes}
        theme={theme}
        menu={Menu}
        dashboard={Dashboard}
        loginPage={Login}
      >
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
    </MuiThemeProvider>
  )
}

export default App
