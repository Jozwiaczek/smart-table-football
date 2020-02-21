// Initializes the `teams` service on path `/teams`
const createService = require('feathers-mongoose')
const createModel = require('../../models/teams.model')
const hooks = require('./teams.hooks')

const {
  constants
} = require('@stf/stf-core')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    Model,
    paginate
  }

  // Initialize our service with any options it requires
  app.use(`/${constants.resources.teams}`, createService(options))

  // Get our initialized service so that we can register hooks
  const service = app.service(constants.resources.teams)

  service.hooks(hooks)
}
