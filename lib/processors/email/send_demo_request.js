const mailgun = require('lib/external/mailgun')
const logger = require('lib/logger')
const config = require('config')

module.exports = function sendDemoRequest (email, name, phone, role, company) {
  const subject = `Sotec | Demo request - ${name}`
  const to = `${config.support.name} <${config.support.email}>`
  const from = `${name} <${email}>`
  const content = {
    text: `
      Name: ${name} \n
      Work Email: ${email} \n
      Phone: ${phone} \n
      Role: ${role} \n
      Company Size: ${company}
    `
  }

  return mailgun.sendMail(to, from, subject, content)
    .then((response) => {
      logger.info('Forwarded contact message sent to', to)
    })
    .catch((error) => {
      logger.error(error)
      throw error
    })
}
