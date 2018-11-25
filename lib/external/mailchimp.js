const Mailchimp = require('mailchimp-client')
const config = require('config')

const mailchimp = new Mailchimp({
  apiKey: config.mailchimp.apiKey,
  host: 'https://us16.api.mailchimp.com'
})

/**
 * add a user to the mailchimp mailing list
 * @param {String}  email    emailid
 * @returns {Object} mailchimp response
 */
exports.subscribe = async function (email, listId) {
  if (!email) {
    throw new Error('email required')
  }
  if (!listId) {
    throw new Error('listId required')
  }

  /*
   * Success
   * {
   *   'email': 'test@example.com',
   *   'euid': 'example euid',
   *   'leid': 'example leid'
   * }
   * Error
   * {
   *   'status': 'error',
   *   'code': -99,
   *   'name': 'Unknown_Exception',
   *   'error': 'An unknown error occurred processing your request.  Please try again later.'
   * }
   * Email_NotExists
   * List_AlreadySubscribed
   * List_DoesNotExist
   * Invalid_ApiKey  The API Key provided is invalid, revoked, you're in the wrong data center, or whatever the error message says.
   * User_Disabled The account being accessed has been disabled - more detail in the actual message returned.
   * User_InvalidRole  The account being accessed does not have permission to access the API method
   * Too_Many_Connections  You didn't pay attention to this
   * User_UnderMaintenance The account being access is currently under temporary maintenance
   * User_InvalidAction  The account being accessed has not been approved for some action - more detail in the actual message returned.
   * ValidationError The parameters passed to the API call are invalid or not provided when required
   */

  const path = `lists/${listId}/members`

  // Verify if mail already exists
  const resp = await mailchimp.get('search-members?query=' + email)
  if (resp.exact_matches.total_items > 0) {
    throw new Error('Already subscribed e-mail address')
  }

  return mailchimp.post(path, {
    body: {
      'email_address': email,
      'status': 'subscribed'
    }
  })
}
