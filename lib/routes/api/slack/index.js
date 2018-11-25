const handler = require('./handler')

module.exports = [
  {
    description: 'Send message to slack channel',
    method: 'POST',
    path: '/send',
    handler: handler.sendToSlack
  },
  {
    description: 'Upload image to slack',
    method: 'POST',
    path: '/upload',
    handler: handler.uploadImage
  }
]
