const mailgun = require('mailgun-js')
const config = require('config')

const logger = require('lib/logger')

const mailgunClient = mailgun({
  apiKey: config.mailgun.apiKey,
  domain: config.mailgun.domain
})

exports.sendMail = function sendTextMail (to, from, subject, content) {
  var data = {
    from,
    to,
    subject,
    text: content.text,
    html: content.html
  }

  return mailgunClient.messages().send(data)
    .then(function (body) {
      logger.debug('body', body)
      return body
    })
}
