// goals-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const { models, constants } = require('stf-core');

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const goals = new Schema(
    {
      [models.goals.fields.team]: {
        type: Schema.Types.ObjectId,
        ref: constants.resources.teams,
        required: true,
      },
      [models.goals.fields.match]: {
        type: Schema.Types.ObjectId,
        ref: constants.resources.matches,
        required: true,
      },
      [models.goals.fields.replay]: {
        type: Schema.Types.String,
      },
    },
    {
      timestamps: true,
    },
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://github.com/Automattic/mongoose/issues/1251
  try {
    return mongooseClient.model(models.goals.name);
  } catch (e) {
    return mongooseClient.model(models.goals.name, goals);
  }
};
