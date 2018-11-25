const mailgun = require('lib/external/mailgun')
const logger = require('lib/logger')
const config = require('config')

module.exports = function sendPasswordReset (user) {
  const subject = 'Sotec | Reset your password'
  const from = `${config.support.name} <${config.support.email}>`
  const to = user.email
  const content = {
    text: `You are receiving this email because you have requested the reset of the password for your account.\n\n
    Please click on the following link, or paste this into your browser to complete the process:\n\n
    ${config.app.url}/reset/${user.passwordResetToken}\n\n
    If you did not request this, please ignore this email and your password will remain unchanged.\n`
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
