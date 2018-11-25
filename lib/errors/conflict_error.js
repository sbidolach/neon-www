const ClientError = require('./client_error')

module.exports = class ConflictError extends ClientError {
  constructor (message, errors, data) {
    super()
    this.message = message
    this.errors = errors
    this.data = data
    this.httpCode = 409
  }
  toJSON () {
    return {
      '@type': 'sb:ConflictError',
      message: this.message,
      errors: this.errors,
      data: this.data
    }
  }
}
