const mongoose = require('mongoose')

const bankSchema = new mongoose.Schema({
  name: String,
  externalAccountId: String,
  externalAccountName: String,
  organization: { type: mongoose.Schema.ObjectId, ref: 'Org' }
})

bankSchema.index({name: 1, organization: 1}, {unique: true})

const Bank = mongoose.model('Bank', bankSchema)

module.exports = Bank
