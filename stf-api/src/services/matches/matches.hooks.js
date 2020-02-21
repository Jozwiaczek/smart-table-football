const { authenticate } = require('@feathersjs/authentication').hooks

const cascadeRemove = require('./hooks/cascade-remove')
const validateTeams = require('./hooks/validate-teams')

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [ validateTeams() ],
    update: [],
    patch: [],
    remove: [ cascadeRemove() ]
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
}
