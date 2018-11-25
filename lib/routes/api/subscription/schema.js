const Joi = require('lib/util/joi_extended')

exports.firebaseToken = function (obj) {
  const schema = Joi.object().keys({
    firebaseToken: Joi.string().stripHtml().required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}
