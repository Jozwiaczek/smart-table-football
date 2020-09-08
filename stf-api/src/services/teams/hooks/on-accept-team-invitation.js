// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { constants, models } = require('stf-core');

const sendNotification = require('../../../utils/sendNotification');

module.exports = function () {
  return async (context) => {
    const TeamsService = context.app.service(constants.resources.teams);
    const editedTeam = await TeamsService.get(context.id);

    if (
      editedTeam[models.teams.fields.invited] &&
      context.data[models.teams.fields.players].length > 1
    ) {
      const PlayersService = context.app.service(constants.resources.players);
      const invitedPlayer = await PlayersService.get(editedTeam[models.teams.fields.invited]);

      const message = `
          ${invitedPlayer[models.players.fields.firstName]} ${
        invitedPlayer[models.players.fields.lastName]
      }
          join to your ${editedTeam[models.teams.fields.name]} team
      `;
      const invitationHost = editedTeam[models.teams.fields.players].find(
        (playerId) => playerId !== invitedPlayer._id,
      );

      await sendNotification(
        context,
        invitationHost,
        message,
        constants.notificationType.general,
        `teams/${editedTeam._id}`,
      );
    }
  };
};
