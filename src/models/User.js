const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  discriminator: {
    type: String,
    required: true
  },
  member: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  banner: {
    type: String
  },
  accentColor: {
    type: String
  }
})

module.exports = mongoose.model('User', userSchema)
