// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const {
  constants,
  models
} = require('../../../../../stf-core')

const errors = require('@feathersjs/errors')

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    try {
      const matchId = context.data[models.goals.fields.match]
      const teamId = context.data[models.goals.fields.team]

      const numberOfGoals = await context.app.service(constants.resources.goals).find({
        query: {
          [models.goals.fields.team]: teamId,
          [models.goals.fields.match]: matchId,
          $limit: 0
        }
      })

      if (numberOfGoals.total === 10) {
        await context.app.service(constants.resources.matches).patch(matchId, {
          [models.matches.fields.winner]: teamId,
          [models.matches.fields.status]: constants.statusMatch.finished
        })
      }
      return context
    } catch (error) {
      console.log(error)
      throw new errors.BadRequest(` ${error.message}`)
    }
  }
}
