// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {
  constants,
  models
} = require('stf-core')

const _ = require('lodash')

const sendNotification = require('../../../utils/sendNotification')

module.exports = function () {
  return async context => {
    const TeamsService = context.app.service(constants.resources.teams)
    const editedTeam = await TeamsService.get(context.id)

    try {
      if (_.isEqual(editedTeam[models.teams.fields.invited], context.params.player._id)) {
        const PlayersService = context.app.service(constants.resources.players)
        const invitedPlayer = await PlayersService.get(editedTeam[models.teams.fields.invited])

        const message = `
          ${invitedPlayer[models.players.fields.firstName]} ${invitedPlayer[models.players.fields.lastName]}
          rejected your invitation to ${editedTeam[models.teams.fields.name]} team
      `
        await sendNotification(
          context,
          editedTeam[models.teams.fields.players][0],
          message,
          constants.notificationType.general,
          '/teams'
        )
      }
    } catch (e) {
      console.error(e)
    }
  }
}
