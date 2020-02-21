// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const {
  models,
  constants
} = require('../../../../../stf-core')

const errors = require('@feathersjs/errors')

const googleDrive = require('../../../integrations/googleDrive')

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    try {
      const goalId = context.id
      const goal = await context.app.service(constants.resources.goals).get(goalId)

      const replayId = goal[models.goals.fields.replay]

      if (replayId) {
        await googleDrive.removeFile(replayId)
      }

      return context
    } catch (error) {
      console.log(error)
      throw new errors.BadRequest(` ${error.message}`)
    }
  }
}
