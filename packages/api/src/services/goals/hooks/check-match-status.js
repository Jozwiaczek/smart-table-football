// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { Conflict } = require('@feathersjs/errors');

const { constants, models } = require('stf-core');

module.exports = function () {
  return async (context) => {
    const matchId = context.data[models.goals.fields.match];
    const match = await context.app.service(constants.resources.matches).get(matchId);

    if (match[models.matches.fields.status] !== constants.statusMatch.active) {
      throw new Conflict('Provided match is not active');
    }

    return context;
  };
};
