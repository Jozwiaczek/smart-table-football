const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks

const { models } = require('stf-core')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [hashPassword(models.admins.fields.password)],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect(models.admins.fields.password)
    ],
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
