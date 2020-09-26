// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { Conflict } = require('@feathersjs/errors');
const { constants } = require('stf-core');

module.exports = () => {
  return async (context) => {
    const { app } = context;

    const tableService = app.service(constants.resources.table);
    const isInGame = await tableService.isInGame();

    if (isInGame) {
      if (context.id && isInGame !== context.id) {
        throw new Conflict('That table is reserved');
      }
    }

    return context;
  };
};
