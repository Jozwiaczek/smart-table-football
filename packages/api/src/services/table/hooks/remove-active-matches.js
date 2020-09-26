// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { constants, models } = require('stf-core');

module.exports = function () {
  return async (context) => {
    const { app, result, method } = context;

    if (!result[models.table.fields.isActive] || method === 'remove') {
      const activeMatches = await app.service(constants.resources.matches).find({
        query: {
          [models.matches.fields.status]: constants.statusMatch.active,
        },
      });

      activeMatches.data.map(async (activeMatch) =>
        app.service(constants.resources.matches).patch(activeMatch._id, {
          [models.matches.fields.status]: constants.statusMatch.paused,
        }),
      );
    }

    return context;
  };
};
