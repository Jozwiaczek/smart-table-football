// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const moment = require('moment')

function localDateAsUTC (dateString, offset) {
  const date = moment(dateString).add(offset, 'hours').toDate()
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const UTCDate = Date.UTC(year, month, day)
  return moment(UTCDate).toDate()
}

function translateDateToUTC (dateKey = 'date') {
  return context => {
    let offset = 0
    if (context.params.query && context.params.query.offset) {
      delete context.params.query.offset
    }
    if (context.params.query && context.params.query[dateKey]) {
      if (typeof context.params.query[dateKey] === 'object') {
        if (context.params.query[dateKey]['$gt']) {
          context.params.query[dateKey]['$gt'] = localDateAsUTC(context.params.query[dateKey]['$gt'], offset)
        }
        if (context.params.query[dateKey]['$gte']) {
          context.params.query[dateKey]['$gte'] = localDateAsUTC(context.params.query[dateKey]['$gte'], offset)
        }
        if (context.params.query[dateKey]['$lt']) {
          context.params.query[dateKey]['$lt'] = localDateAsUTC(context.params.query[dateKey]['$lt'], offset)
        }
        if (context.params.query[dateKey]['$lte']) {
          context.params.query[dateKey]['$lte'] = localDateAsUTC(context.params.query[dateKey]['$lte'], offset)
        }
      } else {
        context.params.query[dateKey] = localDateAsUTC(context.params.query[dateKey], offset)
      }
    }
    if (context.data && context.data[dateKey]) {
      context.data[dateKey] = localDateAsUTC(context.data[dateKey])
    }
  }
}

module.exports = translateDateToUTC
