const ClientError = require('./client_error')

module.exports = class NotFoundError extends ClientError {
  constructor (message) {
    super()
    this.message = message || 'Resource not found'
    this.httpCode = 404
  }
  toJSON () {
    return {
      '@type': 'sb:NotFoundError',
      message: this.message
    }
  }
}
