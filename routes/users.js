const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body
    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ message: 'الإيميل ده موجود بالفعل' })
    const hashed = await bcrypt.hash(password, 10)
    const user = new User({ name, email, phone, password: hashed })
    await user.save()
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'farida_secret', { expiresIn: '7d' })
    res.status(201).json({ token, user: { id: user._id, name, email, phone, role: user.role } })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'الإيميل أو كلمة المرور غلط' })
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ message: 'الإيميل أو كلمة المرور غلط' })
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'farida_secret', { expiresIn: '7d' })
    res.json({ token, user: { id: user._id, name: user.name, email, phone: user.phone, role: user.role } })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.post('/make-admin', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      { role: 'admin' },
      { new: true }
    )
    res.json({ message: 'تم', user })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router