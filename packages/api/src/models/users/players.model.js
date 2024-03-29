// players-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const mongoose = require('mongoose');

const { models, constants } = require('stf-core');

const userSchema = require('./schema/user.schema');
const authManagementSchema = require('./schema/authManagement.schema');

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const players = new mongooseClient.Schema(
    {
      ...userSchema,
      ...authManagementSchema,
      [models.players.fields.firstName]: {
        type: mongoose.SchemaTypes.String,
        required: true,
      },
      [models.players.fields.lastName]: {
        type: String,
        required: true,
      },
      [models.players.fields.locale]: {
        type: mongoose.SchemaTypes.String,
        default: constants.locales.en,
      },
      [models.players.fields.avatar]: {
        type: mongoose.SchemaTypes.String,
      },
    },
    {
      timestamps: true,
    },
  );

  players.index(
    {
      [models.players.fields.email]: 1,
    },
    {
      unique: true,
    },
  );

  const model = mongooseClient.model(models.players.name, players);

  model.ensureIndexes((err) => {
    if (err) {
      console.log(err);
    }
  });

  return model;
};
