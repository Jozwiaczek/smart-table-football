// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { authenticate } = require('@feathersjs/authentication').hooks
const { NotAuthenticated, NotFound } = require('@feathersjs/errors')

const { constants } = require('@stf/stf-core')

function hasToken (hook) {
  return hook.params.headers[constants.authorizationHeaders.player] ||
    hook.params.headers[constants.authorizationHeaders.admin] ||
    hook.data.accessToken
}

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    try {
      let strategy = constants.authStrategies.jwtAdmin
      if (context.params.headers[constants.authorizationHeaders.player]) {
        strategy = constants.authStrategies.jwtPlayer
      }
      return await authenticate(strategy)(context)
    } catch (error) {
      if ((error instanceof NotAuthenticated && !hasToken(context)) ||
        error instanceof NotFound
      ) {
        return context
      }

      throw error
    }
  }
}
