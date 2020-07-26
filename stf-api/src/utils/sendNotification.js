// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { constants } = require('stf-core')

const errors = require('@feathersjs/errors')

module.exports = function (context, player, message, link, type) {
  try {
    const NotificationsService = context.app.service(constants.resources.notifications)
    NotificationsService.create({ player, message, link, type })
  } catch (error) {
    console.error(error)
    errors.BadRequest('Failed sending notification')
  }
}
