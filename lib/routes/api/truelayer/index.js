const handler = require('./handler')

module.exports = [
  {
    description: 'Get TrueLayer Auth Url',
    method: 'GET',
    path: '/getAuthUrl',
    handler: handler.getAuthUrl
  },
  {
    description: 'Fetch bank accounts data',
    method: 'POST',
    path: '/fetchDataFromBank',
    handler: handler.fetchDataFromBank
  },
  {
    description: 'Exchange code for token',
    method: 'POST',
    path: '/exchangeCodeForToken',
    handler: handler.exchangeCodeForToken
  }
]
