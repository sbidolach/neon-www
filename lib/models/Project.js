const mongoose = require('mongoose')

const access = ['public', 'donors', 'private']
const status = ['active', 'deleted']

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  access: { type: String, enum: access, default: 'private' },
  status: { type: String, enum: status, default: 'active' },
  organization: { type: mongoose.Schema.ObjectId, ref: 'Org' },
  managedAccountId: { type: Number },
  managedAccountName: { type: String },
  managedAccountCreated: Number,
  default: { type: Boolean, default: false }
})

projectSchema.index({name: 1, organization: 1}, {unique: true})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project
