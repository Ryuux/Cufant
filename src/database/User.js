const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userId: String,
  discriminator: String,
  username: String,
  avatar: String
})

module.exports = mongoose.model('User', userSchema)
