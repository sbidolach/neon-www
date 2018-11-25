const ClientError = require('./client_error')

module.exports = class ValidationError extends ClientError {
  constructor (message, errors, data) {
    super()
    this.message = message
    this.errors = errors
    this.data = data
    this.httpCode = 400
  }
  toJSON () {
    return {
      '@type': 'sb:ValidationError',
      message: this.message,
      errors: this.errors,
      data: this.data
    }
  }
}
