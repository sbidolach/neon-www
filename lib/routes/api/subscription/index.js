const handler = require('./handler')

module.exports = [
  {
    description: 'Get Active Subscriptions',
    method: 'POST',
    path: '/list',
    handler: handler.getActiveSubscriptions
  },
  {
    description: 'Get Subscription History',
    method: 'POST',
    path: '/history',
    handler: handler.getSubscriptionHistory
  }
]
