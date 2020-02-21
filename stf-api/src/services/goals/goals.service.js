// Initializes the `goals` service on path `/goals`
const createService = require('feathers-mongoose')
const createModel = require('../../models/goals.model')
const hooks = require('./goals.hooks')

const {
  constants
} = require('@stf/stf-core')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    Model,
    paginate,
    multi: true
  }

  // Initialize our service with any options it requires
  app.use(`/${constants.resources.goals}`, createService(options))

  // Get our initialized service so that we can register hooks
  const service = app.service(constants.resources.goals)

  service.hooks(hooks)
}
