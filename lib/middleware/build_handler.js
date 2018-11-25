const Bluebird = require('bluebird')

/**
 * Generate a controller from the route handler
 * @param {function|array} handlers    function or array of functions to turn into express middleware
 * @returns {Function} express middleware
 */
module.exports = function buildHandler (handlers) {
  handlers = [].concat(handlers).filter(h => typeof h === 'function')

  return function controllerMiddleware (req, res, next) {
    if (handlers.length > 0) {
      Bluebird.map(handlers, function (handler) {
        return Bluebird.resolve(handler(req, res)).then(function (body) {
          if (body) {
            res.body = body
          }
        })
      }, {concurrency: 1})
        .nodeify(next)
    } else {
      next()
    }
  }
}
