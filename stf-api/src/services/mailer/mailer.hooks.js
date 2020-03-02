const { authenticate } = require('@feathersjs/authentication').hooks

const htmlToPlainText = require('./hooks/html-to-plain-text')

module.exports = {
  before: {
    // TODO check if needed
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [htmlToPlainText()],
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
}
