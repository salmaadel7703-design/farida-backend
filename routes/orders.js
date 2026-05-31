const express = require('express')
const router = express.Router()
const Order = require('../models/Order')

// جيب كل الطلبات
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// اضف طلب جديد
router.post('/', async (req, res) => {
  try {
    const trackCode = 'FR' + Math.random().toString(36).substr(2, 8).toUpperCase()
    const order = new Order({ ...req.body, trackCode })
    await order.save()
    res.status(201).json(order)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// جيب طلب بالكود
router.get('/track/:code', async (req, res) => {
  try {
    const order = await Order.findOne({ trackCode: req.params.code })
    if (!order) return res.status(404).json({ message: 'مفيش طلب بالكود ده' })
    res.json(order)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// عدل حالة الطلب
router.put('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(order)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// ✅ امسح طلب
router.delete('/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id)
    res.json({ message: 'تم الحذف' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router