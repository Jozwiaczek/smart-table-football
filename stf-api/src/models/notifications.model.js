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
  const notifications = new Schema({
    [models.notifications.fields.player]: {
      type: Schema.Types.ObjectId,
      ref: constants.resources.players,
      required: true
    },
    [models.notifications.fields.message]: {
      type: String,
      required: true
    },
    [models.notifications.fields.link]: {
      type: String
    },
    [models.notifications.fields.isOpen]: {
      type: Boolean,
      default: false
    },
    [models.notifications.fields.type]: {
      type: String,
      enum: Object.keys(constants.notificationType),
      default: constants.notificationType.general
    }
  }, {
    timestamps: true
  })

  // This is necessary to avoid model compilation errors in watch mode
  // see https://github.com/Automattic/mongoose/issues/1251
  try {
    return mongooseClient.model(models.notifications.name)
  } catch (e) {
    return mongooseClient.model(models.notifications.name, notifications)
  }
}
