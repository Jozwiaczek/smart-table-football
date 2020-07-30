// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { constants } = require('stf-core')

const errors = require('@feathersjs/errors')

module.exports = async function (context, player, message, type, link = '/') {
  const formatMsg = msg => msg.replace(/\s\s+/g, ' ')

  try {
    const NotificationsService = context.app.service(constants.resources.notifications)
    await NotificationsService.create({ player, message: formatMsg(message), link, type })
  } catch (error) {
    console.error(error)
    errors.BadRequest('Failed sending notification')
  }
}
