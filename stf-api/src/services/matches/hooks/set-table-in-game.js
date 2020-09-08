// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { constants, models } = require('stf-core');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { app, result } = context;

    if (result[models.matches.fields.status] === constants.statusMatch.active) {
      const tableService = app.service(constants.resources.table);
      const table = await tableService.getTable();
      if (!table[models.table.fields.inGame]) {
        await tableService.patch(table[models.table.fields.id], {
          [models.table.fields.inGame]: result._id,
        });
        await tableService.emitIsInGame();
      }
    }
    return context;
  };
};
