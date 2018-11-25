const errors = require('lib/errors')
const logger = require('lib/logger')
const schema = require('./schema')
const axios = require('axios')
const config = require('config')

exports.getActiveSubscriptions = async (req, res) => {
  const { error, value } = schema.firebaseToken(req.body)

  if (error) {
    logger.error('validation errors', error)
    throw new errors.ValidationError('Invalid values. Please review the entered data.')
  }

  const {serverApi} = config
  const response = await axios({
    method: 'get',
    url: `${serverApi.url}/subscription/list`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': value.firebaseToken,
      'Connection': 'keep-alive'
    }
  })

  const subscriptions = response.data || []
  return res.send(subscriptions)
}

exports.getSubscriptionHistory = async (req, res) => {
  const { error, value } = schema.firebaseToken(req.body)

  if (error) {
    logger.error('validation errors', error)
    throw new errors.ValidationError('Invalid values. Please review the entered data.')
  }

  const {serverApi} = config
  const response = await axios({
    method: 'get',
    url: `${serverApi.url}/subscription/history`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': value.firebaseToken,
      'Connection': 'keep-alive'
    }
  })

  const transactions = response.data || []
  return res.send(transactions)
}
