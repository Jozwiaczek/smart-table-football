// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { BadRequest } = require('@feathersjs/errors')

const {
  models
} = require('stf-core')

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const teamA = context.data[models.matches.fields.teamA]
    const teamB = context.data[models.matches.fields.teamB]

    if (teamA === teamB) {
      throw new BadRequest('Match must be between 2 different teams')
    }

    return context
  }
}
