// Application hooks that run for every service
const { constants } = require('stf-core')

const authentication = require('@feathersjs/authentication')

module.exports = (app) => ({
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      authentication.hooks.authenticate(app.get(constants.resources.authentication).strategies)
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
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
})
