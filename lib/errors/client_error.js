module.exports = class ClientError extends Error {
  constructor (message) {
    super()
    this.message = message
    this.httpCode = 400
    Error.captureStackTrace(this, this.constructor)
  }
  toJSON () {
    return {
      '@type': 'sb:ClientError',
      message: this.message
    }
  }
}
