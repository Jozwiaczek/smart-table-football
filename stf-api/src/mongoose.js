const mongoose = require('mongoose')

module.exports = function (app) {
  mongoose.connect(
    process.env.MONGOLAB_URI || app.get('mongodb'),
    { useCreateIndex: true, useNewUrlParser: true }
  ).catch(err => {
    console.error(err)
    process.exit(1)
  })

  const connection = mongoose.connection

  connection.on('connected', () => console.log('connected db'))

  connection.on('disconnected', () => console.log('disconnected db'))

  connection.on('error', () => console.log('db connection error'))

  mongoose.Promise = global.Promise

  app.set('mongooseClient', mongoose)
}
