const app = require('./app')
const hostname = app.get('host')
const port = process.env.PORT
const server = app.listen(port)

process.on('unhandledRejection', (reason, p) =>
  console.log('Unhandled Rejection at: Promise ', p, reason)
)

server.on('listening', () =>
  console.log('Feathers application started on http://%s:%d', hostname, port)
)
