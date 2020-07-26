// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {
  constants,
  models
} = require('stf-core')

const errors = require('@feathersjs/errors')
const sendNotification = require('../../../utils/sendNotification')

module.exports = function () {
  return async context => {
    try {
      const message = `
        <b>
            ${context.params.player[models.players.fields.firstName]} 
            ${context.params.player[models.players.fields.lastName]}
          </b>
          &nbsp;
          invited you to
          &nbsp;
          <b>${context.result[models.teams.fields.name]}</b>
          &nbsp;
          team      
      `

      sendNotification(
        context,
        context.result[models.teams.fields.invited],
        message,
        `teams/${context.result._id}`,
        constants.notificationType.invitation
      )
    } catch (error) {
      console.error(error)

      const Teams = context.app.service(constants.resources.teams)
      await Teams.remove(context.result._id)

      errors.BadRequest('Failed creating team')
    }
  }
}
