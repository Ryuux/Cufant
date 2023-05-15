require('dotenv').config()
const express = require('express')
const app = express()

const connectDatabase = require('./services/database')
const initializeBot = require('./services/discord')

const usersRoutes = require('./routes/users')

const PORT = process.env.PORT || 3000

app.use('/v1/users', usersRoutes)

app.listen(PORT, async () => {
  try {
    await connectDatabase()
    initializeBot()
    console.log('[+] Cufant ready')
  } catch (error) {
    console.error('Error starting the server:', error)
  }
})
