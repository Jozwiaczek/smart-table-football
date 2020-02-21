const mongoose = require('mongoose')
const logger = require('./logger')

module.exports = function (app) {
  mongoose.connect(
    process.env.MONGOLAB_URI || app.get('mongodb'),
    { useCreateIndex: true, useNewUrlParser: true }
  ).catch(err => {
    logger.error(err)
    process.exit(1)
  })

  const connection = mongoose.connection

  connection.on('connected', () => console.log('connected db'))

  connection.on('disconnected', () => console.log('disconnected db'))

  connection.on('error', () => console.log('db connection error'))

  mongoose.Promise = global.Promise

  app.set('mongooseClient', mongoose)
}
