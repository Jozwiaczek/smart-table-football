const {
  models
} = require('stf-core')

module.exports = {
  [models.authManagementSchema.isVerified]: { type: Boolean },
  [models.authManagementSchema.verifyToken]: { type: String },
  [models.authManagementSchema.verifyShortToken]: { type: String },
  [models.authManagementSchema.verifyExpires]: { type: Date }, // or a long integer
  // verifyChanges: // an object (key-value map), e.g. { field: "value" }
  [models.authManagementSchema.resetToken]: { type: String },
  [models.authManagementSchema.resetShortToken]: { type: String },
  [models.authManagementSchema.resetExpires]: { type: Date } // or a long integer
}
