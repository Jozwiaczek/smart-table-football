// matches-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const {
  models,
  constants
} = require('../../../stf-core')

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient
  const matches = new Schema({
    [models.matches.fields.teamA]: {
      type: Schema.Types.ObjectId,
      ref: constants.resources.teams,
      required: true
    },
    [models.matches.fields.teamB]: {
      type: Schema.Types.ObjectId,
      ref: constants.resources.teams,
      required: true
    },
    [models.matches.fields.status]: {
      type: Schema.Types.String,
      enum: Object.keys(constants.statusMatch),
      default: constants.statusMatch.await,
      required: true
    },
    [models.matches.fields.winner]: {
      type: Schema.Types.ObjectId,
      ref: constants.resources.teams
    },
    [models.matches.fields.replayTime]: {
      type: Schema.Types.Number,
      default: 7,
      required: true,
      min: 4,
      max: 10
    }
  }, {
    timestamps: true
  })

  // This is necessary to avoid model compilation errors in watch mode
  // see https://github.com/Automattic/mongoose/issues/1251
  try {
    return mongooseClient.model(models.matches.name)
  } catch (e) {
    return mongooseClient.model(models.matches.name, matches)
  }
}
