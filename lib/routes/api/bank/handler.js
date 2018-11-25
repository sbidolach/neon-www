const errors = require('lib/errors')
const logger = require('lib/logger')
const schema = require('./schema')
const axios = require('axios')
const config = require('config')

exports.getActiveBanks = async (req, res) => {
  const { error, value } = schema.firebaseToken(req.body)

  if (error) {
    logger.error('validation errors', error)
    throw new errors.ValidationError('Invalid values. Please review the entered data.')
  }

  const {serverApi} = config
  const response = await axios({
    method: 'get',
    url: `${serverApi.url}/banks/list`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': value.firebaseToken,
      'Connection': 'keep-alive'
    }
  })

  const banks = response.data || []
  return res.send(banks)
}

exports.createBankLeadger = async (req, res) => {
  const response = await axios({
    method: 'post',
    url: `http://172.18.97.81:8080/api/issueGbpLedger/5bf9229f-7a17-45d3-a2d7-b48f90cc052a`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'API-Key 8f1n87vetngghvsvx24vqaywokbvsded#1mx3mvrqbq8l3pjshecfywewpva06ckjkftdyb24dg4gb8v5gzygl85f4fadfkjt'
    }
  })

  console.log(response);
  const banks = response.data || []
  console.log(banks);
  return res.send(banks)
}
