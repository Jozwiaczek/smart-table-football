// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { Conflict } = require('@feathersjs/errors');

const { constants, models } = require('stf-core');

module.exports = () => {
  return async (context) => {
    const { app, data } = context;

    if (data[models.matches.fields.status] === constants.statusMatch.active) {
      const Table = app.service(constants.resources.table);

      const isActive = await Table.isActive();

      if (!isActive) {
        throw new Conflict('Table is not active');
      }
    }

    return context;
  };
};
