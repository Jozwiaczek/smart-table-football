const path = require('path')
const favicon = require('serve-favicon')
const compress = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const logger = require('./logger')
const qs = require('qs')

const feathers = require('@feathersjs/feathers')
const configuration = require('@feathersjs/configuration')
const express = require('@feathersjs/express')
const socketio = require('@feathersjs/socketio')

const middleware = require('./middleware')
const services = require('./services')
const appHooks = require('./app.hooks')
const channels = require('./channels')
const onConnectionSocket = require('./onConnectionSocket')

const authentication = require('./authentication')

const mongoose = require('./mongoose')

// const googleDrive = require('./integrations/googleDrive')
// googleDrive.listFiles()

const app = express(feathers())
global['isTableActive'] = false

app.set('query parser', function (str) {
  return qs.parse(str, { arrayLimit: 1000 })
})
// Load app configuration
app.configure(configuration())
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet())
app.use(cors())

app.use(compress())
app.use(express.json({
  limit: '50mb'
}))
app.use(express.urlencoded({
  extended: true,
  limit: '50mb'
}))
app.use(favicon(path.join('./public/', 'favicon.ico')))
// Host the public folder
app.use('/', express.static('./public/'))

// Set up Plugins and providers
app.configure(express.rest())
app.configure(socketio(io => {
  io.on('connection', socket => {
    onConnectionSocket(app, socket)
  })
}))

app.configure(mongoose)

// Configure other middleware (see `middleware/i18nProvider.js`)
app.configure(middleware)
app.configure(authentication)
// test
// Set up our services (see `services/i18nProvider.js`)
app.configure(services)
// Set up event channels (see channels.js)
app.configure(channels)

// Configure a middleware for 404s and the error handler
app.use(express.notFound())
app.use(express.errorHandler({ logger }))

app.hooks(appHooks)

module.exports = app
