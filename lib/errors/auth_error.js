const ClientError = require('./client_error')

module.exports = class AuthError extends ClientError {
  constructor (message) {
    super()
    this.message = message || 'Login required'
    this.httpCode = 401
    Error.captureStackTrace(this, this.constructor)
  }
  toJSON () {
    return {
      '@type': 'sb:AuthError',
      message: this.message
    }
  }
}
