const mailgun = require('lib/external/mailgun')
const logger = require('lib/logger')
const config = require('config')

module.exports = function sendContactMessage (fromEmail, fromName, message) {
  const subject = `Sotec | Contact form - ${fromName}`
  const to = `${config.support.name} <${config.support.email}>`
  const from = `${fromName} <${fromEmail}>`
  const content = {
    text: `Name: ${fromName} Email: ${fromEmail} Message: ${message}`,
    html: `<p>Name: ${fromName}</p><p>Email: ${fromEmail}</p><p>Message: ${message}</p>`
  }

  return mailgun.sendMail(to, from, subject, content)
    .then((response) => {
      logger.info('Forwarded contact message sent to', from)
    })
    .catch((error) => {
      logger.error(error)
      throw error
    })
}
