const express = require('express')
const app = express()

const usersRoutes = require('./routes/users')

const PORT = app.get('PORT') || 3000

app.use('/v1/users', usersRoutes)

app.listen(PORT, () => {
  console.log('listening on port ' + PORT)
})
