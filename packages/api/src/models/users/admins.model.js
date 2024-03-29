// admins-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const { models } = require('stf-core');

const userSchema = require('./schema/user.schema');
const authManagementSchema = require('./schema/authManagement.schema');

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const admins = new mongooseClient.Schema(
    {
      ...userSchema,
      ...authManagementSchema,
    },
    {
      timestamps: true,
    },
  );

  return mongooseClient.model(models.admins.name, admins);
};
