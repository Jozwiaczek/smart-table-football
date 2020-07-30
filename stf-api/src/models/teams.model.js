// teams-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const {
  models,
  constants
} = require('stf-core')

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient
  const teams = new Schema({
    [models.teams.fields.name]: {
      type: String,
      required: true,
      unique: true
    },
    [models.teams.fields.players]: {
      type: [{
        type: Schema.Types.ObjectId,
        ref: constants.resources.players
      }],
      validate: [array => array.length < 3 && array.length > 0, 'Maximum number of players in team is 2 and minimum is 1']
    },
    [models.teams.fields.invited]: {
      type: Schema.Types.ObjectId,
      ref: constants.resources.players
    }
  }, {
    timestamps: true
  })

  // This is necessary to avoid model compilation errors in watch mode
  // see https://github.com/Automattic/mongoose/issues/1251
  try {
    return mongooseClient.model(models.teams.name)
  } catch (e) {
    return mongooseClient.model(models.teams.name, teams)
  }
}
