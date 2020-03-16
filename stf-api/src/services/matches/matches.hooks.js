const { authenticate } = require('@feathersjs/authentication').hooks

const cascadeRemove = require('./hooks/cascade-remove')
const validateTeams = require('./hooks/validate-teams')

const startStopMatchEmitter = require('./hooks/start-stop-match-emitter')

const stopMatchEmitter = require('./hooks/stop-match-emitter')

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [validateTeams()],
    update: [],
    patch: [],
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
