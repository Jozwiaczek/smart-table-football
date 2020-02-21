const resources = {
  authentication: 'authentication',
  playerAuthManagement: 'player-auth-management',
  admins: 'admins',
  players: 'players',
  teams: 'teams',
  matches: 'matches',
  goals: 'goals'
}

const storageKey = 'feathers-jwt'

const userEntities = {
  admin: 'admin',
  player: 'player'
}

const authStrategies = {
  jwtAdmin: 'jwtAdmin',
  jwtPlayer: 'jwtPlayer'
}

const authorizationHeaders = {
  admin: 'authorization-admin',
  player: 'authorization-player'
}

const playerRoutes = {
  passwordReset: 'password/edit'
}

const statusEnum = {
  approved: 'approved',
  rejected: 'rejected',
  pending: 'pending'
}

const statusMatch = {
  await: 'await',
  active: 'active',
  finished: 'finished',
  paused: 'paused'
}

const cardStatusEnum = {
  updating: 'updating',
  error: 'error',
  ok: 'ok'
}

const formNames = {
  registrationForm: 'registrationForm'
}

module.exports = {
  resources,
  userEntities,
  authStrategies,
  authorizationHeaders,
  playerRoutes,
  storageKey,
  statusEnum,
  cardStatusEnum,
  formNames,
  statusMatch
}
