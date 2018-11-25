const requireDir = require('require-directory')

const { lower } = require('lib/util/camel_case')

module.exports = requireDir(module, {
  rename: lower
})
