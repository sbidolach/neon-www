const truthy = require('lib/util/truthy')

const port = process.env.PORT || 3001
const url = process.env.APP_URL || `http://localhost:${port}`
const config = {
  app: {
    port,
    name: process.env.APP_NAME || 'Neon',
    url
  },
  support: {
    email: 'contact@feebuster.co',
    name: 'Neon Hack Team'
  },
  returnStackTrace: truthy(process.env.RETURN_STACK_TRACE, false),
  ensureHttps: truthy(process.env.ENSURE_HTTPS, false),
  session: {
    name: 'SBSID',
    secret: process.env.SESSION_SECRET || 'eda4b6e5027ab1c709d2153b6c8ef347',
    cookie: {
      secure: truthy(process.env.COOKIE_SECURE, false),
      domain: process.env.COOKIE_DOMAIN || 'localhost',
      maxAge: 1000 * 60 * 15 // 15 mins
    }
  },
  captcha: {
    enabled: truthy(process.env.CAPTCHA_ENABLED, true),
    secretKey: process.env.CAPTCHA_SECRET_KEY || '6LezpywUAAAAAEGVwkC67SQHmlGCOydrecHod7uk'
  },
  errbit: {
    enabled: truthy(process.env.ERRBIT_ENABLED, false),
    appId: process.env.ERRBIT_APP_ID || '59ac155e5e0bb3000633549b',
    key: process.env.ERRBIT_KEY || 'c2564c4258aabf9dd664d9a6b1574849',
    serviceHost: process.env.ERRBIT_SERVICE_HOST || 'errors-feebuster.herokuapp.com',
    protocol: process.env.ERRBIT_PROTOCOL || 'https'
  },
  slack: {
    webhook: 'https://hooks.slack.com/services/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'
  },
  serverApi: {
    url: process.env.SERVER_API || 'https://feebuster-server.herokuapp.com'
  }
}

module.exports = config
