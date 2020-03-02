// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const htmlToText = require('html-to-text')

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const htmlField = options.htmlField || 'html'
    const textField = options.textField || 'text'
    if (context.data && context.data[htmlField]) {
      context.data[textField] = htmlToText.fromString(context.data[htmlField] || '')
    }
    return context
  }
}
