// Application hooks that run for every service
const { iff } = require('feathers-hooks-common');

const { constants } = require('stf-core');

const translateDateToUTC = require('./hooks/translate-date-to-utc');

const authenticate = require('./hooks/authenticate');

module.exports = {
  before: {
    all: [
      iff(
        (hook) =>
          hook.params.provider &&
          `/${hook.path}` !== hook.app.get(constants.resources.authentication).path, // ignore authentication
        authenticate(),
      ),
      translateDateToUTC('date'),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
