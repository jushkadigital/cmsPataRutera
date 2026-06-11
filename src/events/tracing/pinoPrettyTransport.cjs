'use strict'

const pretty = require('pino-pretty')

module.exports = function pinoPrettyTransport(options) {
  return pretty({
    colorize: options.colorize !== false,
    translateTime: options.translateTime || 'SYS:HH:MM:ss.l',
  })
}
