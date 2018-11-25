const ClientError = require('./client_error')

module.exports = class RequestError extends ClientError {
  constructor (message) {
    super()
    this.message = message
    this.httpCode = 400
    Error.captureStackTrace(this, this.constructor)
  }
  toJSON () {
    return {
      '@type': 'sb:RequestError',
      message: this.message
    }
  }
}
