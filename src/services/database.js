const mongoose = require('mongoose')

const connectToDatabase = () => {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

module.exports = connectToDatabase
