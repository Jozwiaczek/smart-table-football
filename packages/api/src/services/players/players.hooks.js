const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const verifyHooks = require('feathers-authentication-management').hooks;
const { models, constants } = require('stf-core');

const onboardPlayer = require('./hooks/onboard-player');
const onRemovePlayer = require('./hooks/on-remove-player');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      hashPassword(models.players.fields.password),
      verifyHooks.addVerification(constants.resources.playerAuthManagement),
    ],
    update: [],
    patch: [],
    remove: [onRemovePlayer()],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect(models.players.fields.password),
    ],
    find: [],
    get: [],
    create: [onboardPlayer()],
    update: [],
    patch: [],
    remove: [],
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
