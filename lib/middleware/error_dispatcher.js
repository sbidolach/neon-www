const utils = require('util')

const ClientError = require('lib/errors/client_error')
const safeJson = require('lib/util/safe_json')
const errbit = require('lib/external/errbit')
const logger = require('lib/logger')
const config = require('config')

module.exports = function () {
  /**
   * Handle any errors which were triggered along the way
   * @param {Object} err    express err object
   * @param {Object} req    express request object
   * @param {Object} res    express response object
   * @param {Object} next   express next callback
   * @returns {null} Return the response body to the client
   */
  return function errorDispatcherMiddleware (err, req, res, next) {
    let httpCode
    let errObj = {
      message: err.message,
      errors: err.errors,
      data: err.data
    }

    if (err instanceof ClientError) {
      logger.warn('client error', utils.inspect(errObj, {depth: 8}))
      httpCode = err.httpCode
      errObj = safeJson(errObj)
    } else {
      logger.error('server error', utils.inspect(errObj, {depth: 8}), err.stack)
      const outErr = {
        '@type': 'sb:ServerError',
        message: 'An error occurred whilst processing your request.'
      }

      if (config.returnStackTrace) {
        outErr.stack = err.stack
      }

      errbit(err, req)
      httpCode = 500
      errObj = outErr
    }

    if (res.headersSent) {
      return next(errObj)
    }
    res.status(httpCode)
    res.json(errObj)
  }
}
