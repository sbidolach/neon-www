require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const session = require('express-session')
const passport = require('passport')
const path = require('path')
const cors = require('cors')
const lusca = require('lusca')
const compression = require('compression')

const middleware = require('lib/middleware')
const router = require('lib/router')
const config = require('./config')
require('lib/passport')

const server = express()

process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error)
})

server.disable('etag')
server.disable('x-powered-by')
server.enable('trust proxy')

server.use(middleware.ensureHttps())
server.use(middleware.noCache())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json({limit: '512kb'}))
server.use(fileUpload())
server.use(compression())
server.use(cors({origin: config.app.url}))
server.use(session({
  name: config.session.name,
  resave: true,
  saveUninitialized: true,
  secret: config.session.secret,
  cookie: {
    secure: config.session.cookie.secure,
    maxAge: config.session.cookie.maxAge,
    domain: config.session.cookie.domain,
    httpOnly: true
  }
}))
server.use(passport.initialize())
server.use(passport.session())
server.use(lusca({
  csrf: false,
  xframe: 'SAMEORIGIN',
  hsts: { maxAge: 31536000 },
  xssProtection: true,
  nosniff: true
}))

server.use(express.static('./build'))

// server.use('/api/truelayer', router(require('lib/routes/api/truelayer')))
//server.use('/api/slack', router(require('lib/routes/api/slack')))
// server.use('/api/subscription', router(require('lib/routes/api/subscription')))
server.use('/api/bank', router(require('lib/routes/api/bank')))

server.get('*', (req, res, next) => {
  if (/^\/api(\/.*)?$/.test(req.path) === false) {
    res.sendFile(path.join(__dirname, './build', 'index.html'))
  } else {
    next()
  }
})

server.use(middleware.errorDispatcher())

server.listen(config.app.port, (err) => {
  if (err) throw err
  console.log('> Ready on http://localhost:' + config.app.port)
})
