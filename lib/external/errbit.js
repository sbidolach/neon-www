const Airbrake = require('airbrake')
const lodash = require('lodash')
const path = require('path')

const config = require('config')

let airbrake = {}
if (config.errbit.enabled) {
  airbrake = Airbrake.createClient(config.errbit.appId, config.errbit.key)
  airbrake.host = config.app.url
  airbrake.serviceHost = config.errbit.serviceHost
  airbrake.projectRoot = path.join(__dirname, '../../')
  airbrake.protocol = config.errbit.protocol
}

module.exports = function (error, req) {
  if (config.errbit.enabled) {
    // In case string errors are thrown
    if (typeof error === 'string') {
      error = new Error(error)
    }

    if (req) {
      // Add request environment to error
      error.url = req.originalUrl
      error.action = req.method
      error.params = Object.assign(error.params || {}, {
        // body: req.body, # add this back when masking is available
        query: req.query,
        user: userTransformer(req.user),
        headers: whitelistHeaders(req.headers)
      })
      error.env = process.env.NODE_ENV
      error.session = whitelistSession(req.session)
    }

    // Return airbrake notification
    return new Promise(function (resolve, reject) {
      airbrake.notify(error, function (err, url) {
        if (err) {
          reject(err)
        } else {
          resolve(url)
        }
      })
    })
  } else {
    return Promise.resolve()
  }
}

function whitelistHeaders (headers) {
  const hds = lodash.pick(headers, ['cookie', 'user-agent'])

  hds.cookie = !lodash.isEmpty(headers.cookie)
  return hds
}

function whitelistSession (session = {}) {
  const cookie = lodash.get(session, 'cookie')
  session.cookie = lodash.pick(cookie, ['path', '_expires', 'domain'])

  return Object.assign({}, session, { cookie })
}

function userTransformer (userDoc) {
  const userObj = lodash.pick(userDoc, ['_id', 'email', 'access', 'status'])
  userObj._id = String(userObj._id)

  return userObj
}
