const { AuthAPIClient, DataAPIClient } = require('truelayer-client')
const uuid = require('uuid/v1')
const config = require('config')

const { trueLayerConfig } = config

// Create TrueLayer client instance
const client = new AuthAPIClient({
  client_id: trueLayerConfig.client_id,
  client_secret: trueLayerConfig.client_secret
})

// Define array of permission scopes
const scopes = ['accounts', 'transactions', 'offline_access', 'cards']

const getToken = async (token) => {
  const isValidToken = await DataAPIClient.validateToken(token.access_token)
  if (!isValidToken) {
    const newToken = await client.refreshAccessToken(token.refresh_token)
    // TODO save in db new tokens
    return newToken.access_token
  }
  return token.access_token
}

exports.getAuthUrl = () => {
  return client.getAuthUrl(trueLayerConfig.redirect_uri, scopes, uuid(), '', '', true)
}

exports.refreshAccessToken = (token) => {
  return client.refreshAccessToken(token.refresh_token)
}

exports.exchangeCodeForToken = (code) => {
  return client.exchangeCodeForToken(trueLayerConfig.redirect_uri, code)
}

exports.getInfo = async (token) => {
  const accessToken = await getToken(token)
  return DataAPIClient.getInfo(accessToken)
}

exports.getAccounts = async (token) => {
  const accessToken = await getToken(token)
  return DataAPIClient.getAccounts(accessToken)
}

exports.getTransactions = async (token, accountId) => {
  const accessToken = await getToken(token)
  return DataAPIClient.getTransactions(accessToken, accountId)
}

exports.getBalance = async (token, accountId) => {
  const accessToken = await getToken(token)
  return DataAPIClient.getBalance(accessToken, accountId)
}

exports.getCards = async (token) => {
  const accessToken = await getToken(token)
  return DataAPIClient.getCards(accessToken)
}

exports.getCardBalance = async (token, accountId) => {
  const accessToken = await getToken(token)
  return DataAPIClient.getCardBalance(accessToken, accountId)
}

exports.getCardTransactions = async (token, accountId) => {
  const accessToken = await getToken(token)
  return DataAPIClient.getCardTransactions(accessToken, accountId)
}
