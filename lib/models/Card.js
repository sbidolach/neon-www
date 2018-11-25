const mongoose = require('mongoose')

const status = ['active', 'inactive', 'deleted']

const cardSchema = new mongoose.Schema({
  status: { type: String, enum: status, default: 'active' },
  virtualCardId: String,
  virtualCardName: String,
  project: { type: mongoose.Schema.ObjectId, ref: 'Project' },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
})

const Card = mongoose.model('Card', cardSchema)

module.exports = Card
