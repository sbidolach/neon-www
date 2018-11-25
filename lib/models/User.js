const mongoose = require('mongoose')
const Bluebird = require('bluebird')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const states = ['pending', 'active', 'blocked', 'deleted']
const access = ['owner', 'admin', 'user']

const userSchema = new mongoose.Schema({
  email: { type: String, index: true },
  phone: String,
  access: { type: String, enum: access, default: 'owner' },
  emailVerified: { type: Boolean, default: false },
  phoneVerified: { type: Boolean, default: false },

  password: {
    type: String,
    set: function (password) {
      this._oldPassword = this.password
      return password
    }
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  passwordHistory: [{ type: String }],

  status: { type: String, enum: states, default: 'active' },

  tokens: Array,

  profile: {
    name: { type: String, default: '' },
    gender: String,
    location: String,
    website: String,
    picture: String,
    role: String
  }
}, { timestamps: true })

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save (next) {
  const user = this

  if (!user.isModified('password')) { next() }

  const oldPassword = this._oldPassword
  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(user.password, salt))
    .then((hash) => {
      user.passwordHistory = [oldPassword]
        .concat(user.passwordHistory)
        .slice(0, 4)
      user.password = hash
      next()
    })
    .catch(e => next(e))
})

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function gravatar (size) {
  if (!size) {
    size = 200
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex')
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`
}

userSchema.methods.isPasswordAllowed = function isPasswordAllowed (candidatePassword) {
  const passwordHistory = this.passwordHistory || []
  passwordHistory.push(this.password)

  return Bluebird.reduce(passwordHistory, (isValid, oldPassword) => {
    return bcrypt.compare(candidatePassword, oldPassword)
      .then(isMatch => isValid && !isMatch)
  }, true)
}

const User = mongoose.model('User', userSchema)

module.exports = User
