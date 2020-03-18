const userSchema = {
  email: 'email',
  password: 'password',
  status: 'status'
}

const authManagementSchema = {
  isVerified: 'isVerified',
  verifyToken: 'verifyToken',
  verifyShortToken: 'verifyShortToken',
  verifyExpires: 'verifyExpires',
  resetToken: 'resetToken',
  resetShortToken: 'resetShortToken',
  resetExpires: 'resetExpires'
}

const admins = {
  name: 'admins',
  fields: {
    ...userSchema
  }
}

const players = {
  name: 'players',
  fields: {
    ...userSchema,
    ...authManagementSchema,
    firstName: 'firstName',
    lastName: 'lastName',
    useDarkTheme: 'useDarkTheme',
    locale: 'locale',
    googleId: 'googleId',
    facebookId: 'facebookId'
  }
}

const teams = {
  name: 'teams',
  fields: {
    name: 'name',
    players: 'players'
  }
}

const table = {
  name: 'table',
  fields: {
    id: 'id',
    isActive: 'isActive'
  }
}

const matches = {
  name: 'matches',
  fields: {
    teamA: 'teamA',
    teamB: 'teamB',
    winner: 'winner',
    status: 'status',
    replayTime: 'replayTime',
    elapsedTime: 'elapsedTime'
  }
}

const goals = {
  name: 'goals',
  fields: {
    team: 'team',
    match: 'match',
    replay: 'replay'
  }
}

module.exports = {
  userSchema,
  authManagementSchema,
  admins,
  players,
  teams,
  matches,
  goals,
  table
}
