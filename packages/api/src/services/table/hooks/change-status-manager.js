// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { models, constants } = require('stf-core');

module.exports = function () {
  return async (context) => {
    const { app, result, method } = context;

    let response = result[models.table.fields.isActive];
    if (method === 'remove') {
      response = false;
    }

    app.io.emit(constants.socketEvents.isTableActivePlayer, response);

    return context;
  };
};
