// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {
  constants,
  models
} = require('../../../../../stf-core')

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const matchId = context.id

    const numberOfGoals = await context.app.service(constants.resources.goals).find({
      query: {
        [models.goals.fields.match]: matchId,
        $limit: 0
      }
    })

    if (numberOfGoals.total > 0) {
      await context.app.service(constants.resources.goals).remove(null, {
        query: {
          [models.goals.fields.match]: matchId
        }
      })
    }

    return context
  }
}
