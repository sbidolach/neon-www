const errors = require('lib/errors')
const logger = require('lib/logger')
const truelayer = require('lib/external/truelayer')
const schema = require('./schema')
const axios = require('axios')
const config = require('config')

exports.getAuthUrl = async (req, res) => {
  const truelayerAuthUrl = truelayer.getAuthUrl()
  return res.send({
    url: truelayerAuthUrl
  })
}

exports.exchangeCodeForToken = async (req, res) => {
  const { error, value } = schema.exchangeCodeForToken(req.body)

  if (error) {
    logger.error('validation errors', error)
    throw new errors.ValidationError('Invalid values. Please review the entered data.')
  }

  const token = await truelayer.exchangeCodeForToken(value.code)

  return res.send({
    token
  })
}

exports.fetchDataFromBank = async (req, res) => {
  const { error, value } = schema.fetchDataFromBank(req.body)

  if (error) {
    logger.error('validation errors', error)
    throw new errors.ValidationError('Invalid values. Please review the entered data.')
  }

  const {serverApi} = config
  const response = await axios({
    method: 'post',
    url: `${serverApi.url}/truelayer/integration`,
    data: value.trueLayerToken,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': value.firebaseToken,
      'Connection': 'keep-alive'
    }
  })

  const {banks} = response.data

  return res.send({
    banks
  })
}
