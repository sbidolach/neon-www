const mailgun = require('lib/external/mailgun')
const logger = require('lib/logger')
const config = require('config')

module.exports = function sendPasswordChanged (user) {
  const subject = 'Sotec | Your password has been changed'
  const from = `${config.support.name} <${config.support.email}>`
  const to = user.email
  const content = {
    text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
  }

  return mailgun.sendMail(to, from, subject, content)
    .then((response) => {
      logger.info('Password changed confirmation sent to', to)
    })
    .catch((error) => {
      logger.error(error)
      throw error
    })
}
