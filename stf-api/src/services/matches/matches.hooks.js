const { authenticate } = require('@feathersjs/authentication').hooks

const cascadeRemove = require('./hooks/cascade-remove')
const validateTeams = require('./hooks/validate-teams')
const startStopMatchEmitter = require('./hooks/start-stop-match-emitter')
const stopMatchEmitter = require('./hooks/stop-match-emitter')
const checkTableStatus = require('./hooks/check-table-status')
const isTableInGame = require('./hooks/is-table-in-game')
const setTableInGame = require('./hooks/set-table-in-game')
const setTableAvailable = require('./hooks/set-table-available')

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [
      validateTeams(),
      checkTableStatus(),
      isTableInGame()
    ],
    update: [
      checkTableStatus(),
      isTableInGame()
    ],
    patch: [
      checkTableStatus(),
      isTableInGame()
    ],
    remove: [cascadeRemove()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      startStopMatchEmitter(),
      setTableInGame()
    ],
    update: [
      startStopMatchEmitter(),
      setTableInGame(),
      setTableAvailable()
    ],
    patch: [
      startStopMatchEmitter(),
      setTableInGame(),
      setTableAvailable()
    ],
    remove: [
      stopMatchEmitter(),
      setTableAvailable()
    ]
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
