/* eslint-disable no-console */
const app = require('./app')
const hostname = app.get('host')
const port = process.env.PORT || 8080
const server = app.listen(port)

process.on('unhandledRejection', (reason, p) =>
  console.error('Unhandled Rejection at: Promise ', p, reason)
)

server.on('listening', () =>
  console.info('Feathers application started on http://%s:%d', hostname, port)
)
