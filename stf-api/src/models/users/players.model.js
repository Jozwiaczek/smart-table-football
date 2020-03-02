// players-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const mongoose = require('mongoose')

const userSchema = require('./schema/user.schema')
const authManagementSchema = require('./schema/authManagement.schema')

const { models } = require('stf-core')

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const players = new mongooseClient.Schema({
    ...userSchema,
    ...authManagementSchema,
    [models.players.fields.googleId]: { type: String },

    [models.players.fields.facebookId]: { type: String },

    [models.players.fields.firstName]: {
      type: mongoose.SchemaTypes.String,
      required: true
    },
    [models.players.fields.lastName]: {
      type: String,
      required: true
    },
    [models.players.fields.useDarkTheme]: {
      type: mongoose.SchemaTypes.Boolean,
      default: false
    }
  }, {
    timestamps: true
  })

  players.index({
    [models.players.fields.email]: 1
  }, {
    unique: true
  })

  const model = mongooseClient.model(models.players.name, players)

  model.ensureIndexes((err) => {
    if (err) {
      console.log(err)
    }
  })

  return model
}
