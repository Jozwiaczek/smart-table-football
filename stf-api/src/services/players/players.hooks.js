const verifyHooks = require('feathers-authentication-management').hooks
const {
  models,
  constants
} = require('../../../../stf-core')

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks

// const onboardPlayer = require('./hooks/onboard-player')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      hashPassword(models.players.fields.password),
      verifyHooks.addVerification(constants.resources.playerAuthManagement)
    ],
    update: [ hashPassword(models.players.fields.password) ],
    patch: [ hashPassword(models.players.fields.password) ],
    remove: []
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect(models.players.fields.password)
    ],
    find: [],
    get: [],
    create: [
      // onboardPlayer()
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
