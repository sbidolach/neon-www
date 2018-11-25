const mailgun = require('lib/external/mailgun')
const logger = require('lib/logger')
const config = require('config')

module.exports = function sendUserEmailVerify (user, token) {
  const subject = 'Sotec | Email Verification'
  const from = `${config.support.name} <${config.support.email}>`
  const to = user.email
  const content = {
    text: `Thank you for signing up for a Sotec account. You are just one step away from using your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      ${config.app.url}/verify/${token}\n\n
      If you did not request this, please ignore this email.\n`
  }

  return mailgun.sendMail(to, from, subject, content)
    .then((response) => {
      logger.info('Password reset sent to', to)
    })
    .catch((error) => {
      logger.error(error)
      throw error
    })
}
