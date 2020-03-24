const { authenticate } = require('@feathersjs/authentication').hooks

const cascadeRemove = require('./hooks/cascade-remove')
const validateTeams = require('./hooks/validate-teams')

const startStopMatchEmitter = require('./hooks/start-stop-match-emitter')

const stopMatchEmitter = require('./hooks/stop-match-emitter')

const checkTableStatus = require('./hooks/check-table-status')

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [validateTeams(), checkTableStatus()],
    update: [checkTableStatus()],
    patch: [checkTableStatus()],
    remove: [cascadeRemove()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [startStopMatchEmitter()],
    update: [startStopMatchEmitter()],
    patch: [startStopMatchEmitter()],
    remove: [stopMatchEmitter()]
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
