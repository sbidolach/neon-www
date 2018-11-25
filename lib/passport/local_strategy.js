const LocalStrategy = require('passport-local').Strategy

const User = require('lib/models/User')

/**
 * Sign in using Email and Password.
 */
module.exports = new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email: email.toLowerCase() }, (err, user) => {
    if (err) { return done(err) }
    if (!user) {
      return done(null, false, { msg: `Email ${email} not found.` })
    }
    user.comparePassword(password)
      .then((isMatch) => {
        if (isMatch) {
          return done(null, user.toObject())
        }
        return done(null, false, { msg: 'Invalid email or password.' })
      })
      .catch(err => {
        return done(err)
      })
  })
})
