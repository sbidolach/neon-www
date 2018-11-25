const {flow, camelCase, upperFirst} = require('lodash')

exports.upper = function (string) {
  return flow(camelCase, upperFirst)(string)
}

exports.lower = function (string) {
  return camelCase(string)
}
