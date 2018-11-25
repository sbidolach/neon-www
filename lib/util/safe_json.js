const CircularJSON = require('circular-json')

module.exports = function safeJson (circleRefObj) {
  return JSON.parse(CircularJSON.stringify(circleRefObj))
}
