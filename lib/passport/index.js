const passport = require('passport')

const localStrategy = require('./local_strategy')
const User = require('lib/models/User')

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  User.findOne({_id: id, status: {$in: ['pending', 'active']}}, {}, (err, user) => {
    done(err, user)
  })
})

passport.use(localStrategy)
