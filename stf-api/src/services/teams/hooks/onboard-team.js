// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { constants, models } = require('stf-core');

const errors = require('@feathersjs/errors');

const sendNotification = require('../../../utils/sendNotification');

module.exports = function () {
  return async (context) => {
    try {
      const { params } = context;
      const playerFirstName = params.player && params.player[models.players.fields.firstName];
      if (playerFirstName) {
        const message = `
          ${playerFirstName} 
          ${context.params.player[models.players.fields.lastName]}
          invited you to ${context.result[models.teams.fields.name]} team      
      `;

        await sendNotification(
          context,
          context.result[models.teams.fields.invited],
          message,
          constants.notificationType.invitation,
          `teams/${context.result._id}/show`,
        );
      }
    } catch (error) {
      console.error(error);

      const Teams = context.app.service(constants.resources.teams);
      await Teams.remove(context.result._id);

      errors.BadRequest('Failed creating team');
    }
  };
};
