// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { models, constants } = require('stf-core');

const googleDrive = require('../../../integrations/googleDrive');

module.exports = function () {
  return async (context) => {
    try {
      const goalId = context.id;
      const goal = await context.app.service(constants.resources.goals).get(goalId);

      const replayId = goal[models.goals.fields.replay];

      if (replayId) {
        await googleDrive.removeFile(replayId);
      }
    } catch (error) {
      console.log(error);
    }
    return context;
  };
};
