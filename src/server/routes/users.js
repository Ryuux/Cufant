const express = require('express')
const router = express.Router()
const User = require('../../database/User')

router.get('/:id', async (req, res) => {
  const userId = req.params.id
  const user = await User.findOne({ userId })

  if (user) {
    res.json(user)
  } else {
    res.json({ message: 'The user does not exist' })
  }
})

module.exports = router
