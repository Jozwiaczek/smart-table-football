// Initializes the `playerAuthManagement` service on path `/player-auth-management`
const authManagement = require('feathers-authentication-management')

const hooks = require('./player-auth-management.hooks')

const {
  resources
} = require('stf-core').constants

module.exports = function (app) {
  // Get our initialized service so that we can register hooks
  app.configure(authManagement({
    service: resources.players,
    path: resources.playerAuthManagement,
    skipIsVerifiedCheck: true
  }))

  app.service(resources.playerAuthManagement).hooks(hooks)
}
