const Bluebird = require('bluebird')

const { AuthError } = require('lib/errors')
const logger = require('lib/logger')

/**
 * authorize a request, all tests must pass to continue
 * @param {Array|String|Function} authTests    authentication tests
 * @returns {Function}   express middleware
 */
module.exports = function authorizor (authTests) {
  // ensure authtests is an array
  authTests = [].concat(authTests)

  /**
   * authorization middlware
   * @param {Object}    req       express request
   * @param {Object}    res       express response
   * @param {Function}  next      express next
   * @returns {undefined} void
   */
  return async function authorizorMiddleware (req, res, next) {
    const user = req.user

    const authorizationTests = await Bluebird.map(authTests, function (authTest) {
      if (typeof authTest === 'string' && authTest === 'loggedIn') {
        if (!user) {
          logger.warn('user not logged in')
          return new AuthError('Logged in user required')
        }
      }
    })

    // Collect the authentication errors
    const authErrors = authorizationTests.filter(t => t)

    if (authErrors.length > 0) {
      next(authErrors[0])
    } else {
      next()
    }
  }
}
