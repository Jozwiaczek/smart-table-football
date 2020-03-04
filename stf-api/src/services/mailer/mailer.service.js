// Initializes the `mailer` service on path `/mailer`
const { Mailer } = require('./mailer.class')
const hooks = require('./mailer.hooks')
const { constants } = require('stf-core')

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use(`/${constants.resources.mailer}`, new Mailer(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service(constants.resources.mailer)

  service.hooks(hooks)
}
