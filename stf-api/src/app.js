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

const app = express(feathers())
app.set('query parser', function (str) {
  return qs.parse(str, { arrayLimit: 1000 })
})
// Load app configuration
app.configure(configuration())
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet())
// app.use(cors())
corsOptions = {
  origin: "https://stf-player.herokuapp.com",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

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

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware)
app.configure(authentication)
// test
// Set up our services (see `services/index.js`)
app.configure(services)
// Set up event channels (see channels.js)
app.configure(channels)

// Configure a middleware for 404s and the error handler
app.use(express.notFound())
app.use(express.errorHandler({ logger }))

app.hooks(appHooks)

module.exports = app
