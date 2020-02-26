// Application hooks that run for every service
const translateDateToUTC = require('./hooks/translate-date-to-utc')

const { iff } = require('feathers-hooks-common')

const authenticate = require('./hooks/authenticate')

const { constants } = require('stf-core')

module.exports = {
  before: {
    all: [
      iff(
        hook => hook.params.provider && `/${hook.path}` !== hook.app.get(constants.resources.authentication).path, // ignore authentication
        authenticate(),
        () => console.log('here')
      ),
      translateDateToUTC('date')
    ],
    find: [],
    get: [],
    create: [],
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
