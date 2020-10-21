// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { constants, models } = require('stf-core');

module.exports = () => {
  return async (context) => {
    const { app, result } = context;

    if (
      result[models.matches.fields.status] === constants.statusMatch.paused ||
      result[models.matches.fields.status] === constants.statusMatch.finished
    ) {
      const tableService = app.service(constants.resources.table);
      const table = await tableService.getTable();
      if (table && table[models.table.fields.inGame]) {
        tableService.patch(table.id, {
          [models.table.fields.inGame]: null,
        });
        await tableService.emitIsInGame();
      }
    }

    return context;
  };
};
