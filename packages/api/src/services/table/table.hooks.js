const { authenticate } = require('@feathersjs/authentication').hooks;

const changeStatusManager = require('./hooks/change-status-manager');
const removeActiveMatches = require('./hooks/remove-active-matches');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [changeStatusManager()],
    update: [changeStatusManager(), removeActiveMatches()],
    patch: [changeStatusManager(), removeActiveMatches()],
    remove: [changeStatusManager(), removeActiveMatches()],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
