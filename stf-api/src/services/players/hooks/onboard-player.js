// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {
  constants,
  models
} = require('stf-core')

const errors = require('@feathersjs/errors')

// eslint-disable-next-line no-unused-vars
module.exports = function () {
  return async context => {
    const { email } = context.data

    try {
      const PlayerAuthManagement = context.app.service(constants.resources.playerAuthManagement)

      PlayerAuthManagement.create({
        action: 'resendVerifySignup',
        value: { email }
      })

      const Teams = context.app.service(constants.resources.teams)

      await Teams.create({
        [models.teams.fields.name]: `Personal: ${email}`,
        [models.teams.fields.players]: [context.result._id]
      })
    } catch (error) {
      console.error(error)

      const Players = context.app.service(constants.resources.players)
      await Players.remove(context.result._id)

      errors.BadRequest('Failed to create player')
    }
  }
}
