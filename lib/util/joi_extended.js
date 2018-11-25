const Joi = require('joi')

const stripHtml = require('./strip_html')

module.exports = Joi.extend((joi) => ({
  base: joi.string(),
  name: 'string',
  language: {
    stripHtml: 'needs to be a stripped html string'
  },
  rules: [
    {
      name: 'stripHtml',
      setup (params) {
        this._flags.stripHtml = true
      },
      validate (params, value, state, options) {
        return stripHtml(value)
      }
    }
  ]
}))
