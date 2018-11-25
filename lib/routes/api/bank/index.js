const handler = require('./handler')

module.exports = [
  {
    description: 'Get Bank list',
    method: 'POST',
    path: '/list',
    handler: handler.getActiveBanks
  }, {
    description: 'Get Bank list',
    method: 'POST',
    path: '/leadger',
    handler: handler.createBankLeadger
  }
]
