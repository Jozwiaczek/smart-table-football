// Initializes the `table` service on path `/table`
const { constants } = require('stf-core');

const { Table } = require('./table.class');
const hooks = require('./table.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use(`/${constants.resources.table}`, new Table(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service(constants.resources.table);

  service.hooks(hooks);
};
