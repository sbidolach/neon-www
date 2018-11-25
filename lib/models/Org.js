const mongoose = require('mongoose')

const status = ['pending', 'active', 'deleted']

const orgSchema = new mongoose.Schema({
  name: String,
  number: { type: String, unique: true },
  location: {
    address: String,
    postcode: String,
    city: String,
    lat: Number,
    lng: Number
  },
  status: { type: String, enum: status, default: 'active' },
  users: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  isValid: { type: Boolean, required: true, default: false }
})

const Org = mongoose.model('Org', orgSchema)

module.exports = Org
