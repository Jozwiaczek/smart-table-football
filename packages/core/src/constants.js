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
  manager: 'manager',
  isManagerRunning: 'isManagerRunning',
  managerRunning: 'managerRunning',
  managerUpdated: 'managerUpdated',
  managerLogs: 'managerLogs',
  currentStepTime: 'currentStepTime',
  clearLogs: 'clearLogs',
};

const managerActions = {
  turnOn: 'turnOn',
  turnOff: 'turnOff',
  update: 'update',
  reboot: 'reboot',
};

module.exports = {
  resources,
  userEntities,
  authStrategies,
  authorizationHeaders,
  storageKey,
  statusEnum,
  statusMatch,
  locales,
  socketEvents,
  themeMode,
  notificationType,
  managerActions,
};
