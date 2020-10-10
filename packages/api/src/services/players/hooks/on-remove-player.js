// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { constants, models } = require('stf-core');

module.exports = function () {
  return async (context) => {
    const playerId = context.id;

    const personalTeam = (
      await context.app.service(constants.resources.teams).find({
        query: {
          [models.teams.fields.players]: [playerId],
        },
      })
    ).data[0];

    await context.app.service(constants.resources.teams).remove(personalTeam._id);

    return context;
  };
};
