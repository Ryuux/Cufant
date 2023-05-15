const express = require('express')
const router = express.Router()

const User = require('../models/User')

router.get('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const user = await User.findOne({ id }).select('-_id -__v')

    if (user) {
      res.json({ success: true, user })
    } else {
      res.json({ message: 'The user does not exist' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user' })
  }
})

module.exports = router
