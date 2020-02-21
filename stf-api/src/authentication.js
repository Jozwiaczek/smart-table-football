const authentication = require('@feathersjs/authentication')
const jwt = require('@feathersjs/authentication-jwt')
const local = require('@feathersjs/authentication-local')

const { constants } = require('../../stf-core')

const createAuthHooks = require('./authentication.hooks')

module.exports = function (app) {
  const config = app.get('authentication')

  // Set up authentication with the secret
  app.configure(authentication(config))

  // configure JWT strategies
  app.configure(jwt({
    name: constants.authStrategies.jwtAdmin,
    header: constants.authorizationHeaders.admin,
    entity: constants.userEntities.admin,
    service: constants.resources.admins
  }))
  app.configure(jwt({
    name: constants.authStrategies.jwtPlayer,
    header: constants.authorizationHeaders.player,
    entity: constants.userEntities.player,
    service: constants.resources.players
  }))

  app.service(constants.resources.authentication).hooks(createAuthHooks(app))

  // configure local strategies
  app.configure(local(config.admin))
  app.configure(local(config.player))
}
