const mongoose = require('mongoose')

const config = require('config')
const logger = require('lib/logger')

mongoose.Promise = global.Promise

mongoose.connect(config.mongoUrl)
logger.info('Connecting to', config.mongoUrl)

mongoose.connection.on('error', () => {
  logger.info('%s MongoDB connection error. Please make sure MongoDB is running.')
  process.exit()
})

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    logger.info('Mongoose default connection disconnected through app termination')
    process.exit(0)
  })
})

module.exports = mongoose.connection
