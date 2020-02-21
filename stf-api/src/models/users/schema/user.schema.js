const validator = require('validator')

const {
  models,
  constants
} = require('@stf/stf-core')

module.exports = {
  [models.userSchema.email]: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: ({ value }) => `${value} is not a valid email address`
    },
    required: true,
    unique: true,
    lowercase: true
  },
  [models.userSchema.password]: {
    type: String,
    required: true
  },
  [models.userSchema.status]: {
    type: String,
    enum: Object.keys(constants.statusEnum),
    default: constants.statusEnum.approved,
    required: true
  }
}
