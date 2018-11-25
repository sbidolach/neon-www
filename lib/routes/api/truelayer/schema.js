const Joi = require('lib/util/joi_extended')

exports.exchangeCodeForToken = function (obj) {
  const schema = Joi.object().keys({
    code: Joi.string().stripHtml().required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}

exports.fetchDataFromBank = function (obj) {
  const schema = Joi.object().keys({
    trueLayerToken: {
      access_token: Joi.string().stripHtml().required(),
      refresh_token: Joi.string().stripHtml().required(),
      token_type: Joi.string().stripHtml().required()
    },
    firebaseToken: Joi.string().stripHtml().required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}

exports.token = function (obj) {
  const schema = Joi.object().keys({
    token: {
      access_token: Joi.string().stripHtml().required(),
      refresh_token: Joi.string().stripHtml().required()
    },
    accountId: Joi.string().stripHtml()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}
