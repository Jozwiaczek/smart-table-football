const { authenticate } = require('@feathersjs/authentication').hooks

const checkNumberOfGoals = require('./hooks/check-number-of-goals')
const checkMatchStatus = require('./hooks/check-match-status')
const removeReplay = require('./hooks/remove-replay')

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [ checkMatchStatus() ],
    update: [],
    patch: [],
    remove: [ removeReplay() ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [ checkNumberOfGoals() ],
    update: [ checkNumberOfGoals() ],
    patch: [ checkNumberOfGoals() ],
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
