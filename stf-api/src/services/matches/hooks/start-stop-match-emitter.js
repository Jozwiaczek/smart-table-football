// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const {
  constants,
  models
} = require('stf-core')

// eslint-disable-next-line no-unused-vars
module.exports = () => {
  return async (context) => {
    const { app, result } = context

    if (result[models.matches.fields.status] === constants.statusMatch.active) {
      app.io.emit('startListening', result)
    } else {
      app.io.emit('stopListening')
    }
    return context
  }
}
