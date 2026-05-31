const express = require('express')
const router = express.Router()
const Coupon = require('../models/Coupon')

// جيب كل الكوبونات (للأدمن)
router.get('/', async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 })
    res.json(coupons)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// تحقق من كوبون (للعميل)
router.post('/validate', async (req, res) => {
  try {
    const { code } = req.body
    const coupon = await Coupon.findOne({ code: code.toUpperCase() })
    if (!coupon) return res.status(404).json({ message: 'الكوبون ده مش صحيح' })
    if (!coupon.active) return res.status(400).json({ message: 'الكوبون ده منتهي' })
    if (coupon.usedCount >= coupon.maxUses) return res.status(400).json({ message: 'الكوبون اتستخدم الحد الأقصى' })
    res.json({ discount: coupon.discount, type: coupon.type, code: coupon.code })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// أضف كوبون (للأدمن)
router.post('/', async (req, res) => {
  try {
    const coupon = new Coupon({ ...req.body, code: req.body.code.toUpperCase() })
    await coupon.save()
    res.status(201).json(coupon)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// عدل كوبون
router.put('/:id', async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(coupon)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// امسح كوبون
router.delete('/:id', async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id)
    res.json({ message: 'تم الحذف' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router