// const { authenticate } = require('@feathersjs/authentication').hook
// const { when } = require('feathers-hooks-common')
//
// const isAction = (...args) => hook => args.includes(hook.data.action)

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      // when(isAction('passwordChange', 'identityChange'), authenticate('jwt'))
      // TODO how to handle passwordChange and identityChange action authentication
    ],
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
