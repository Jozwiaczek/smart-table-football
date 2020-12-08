const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  // For details errors, change level to debug
  level: 'info',
  format: format.combine(format.splat(), format.simple()),
  transports: [new transports.Console()],
});

module.exports = logger;
