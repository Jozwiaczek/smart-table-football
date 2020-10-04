const resources = {
  authentication: 'authentication',
  playerAuthManagement: 'player-auth-management',
  admins: 'admins',
  players: 'players',
  teams: 'teams',
  matches: 'matches',
  goals: 'goals',
  mailer: 'mailer',
  table: 'table',
  notifications: 'notifications',
};

const notificationType = {
  general: 'general',
  invitation: 'invitation',
  update: 'update',
};

const storageKey = 'feathers-jwt';

const themeMode = {
  name: 'themeMode',
  type: {
    light: 'light',
    dark: 'dark',
  },
};

const userEntities = {
  admin: 'admin',
  player: 'player',
};

const authStrategies = {
  jwtAdmin: 'jwtAdmin',
  jwtPlayer: 'jwtPlayer',
};

const locales = {
  en: 'en',
  pl: 'pl',
};

const authorizationHeaders = {
  admin: 'authorization-admin',
  player: 'authorization-player',
};

const playerRoutes = {
  passwordReset: 'password/edit',
};

const statusEnum = {
  approved: 'approved',
  rejected: 'rejected',
  pending: 'pending',
};

const statusMatch = {
  await: 'await',
  active: 'active',
  finished: 'finished',
  paused: 'paused',
};

const cardStatusEnum = {
  updating: 'updating',
  error: 'error',
  ok: 'ok',
};

const formNames = {
  registrationForm: 'registrationForm',
};

const socketEvents = {
  disconnect: 'disconnect',
  connection: 'connection',
  isTableActiveRasp: 'isTableActiveRasp',
  tableActiveRasp: 'tableActiveRasp',
  isTableActivePlayer: 'isTableActivePlayer',
  startListening: 'startListening',
  stopListening: 'stopListening',
  createdGoal: 'createdGoal',
  goal: 'goal',
  isTableInGame: 'isTableInGame',
  connect: 'connect',
};

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
  statusMatch,
  locales,
  socketEvents,
  themeMode,
  notificationType,
};
