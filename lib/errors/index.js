const { upper } = require('lib/util/camel_case')
const requireDir = require('require-directory')

module.exports = requireDir(module, {
  rename: upper
})
