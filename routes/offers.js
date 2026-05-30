const express = require('express')
const router = express.Router()
const Offer = require('../models/Offer')

router.get('/', async (req, res) => {
  try {
    const offers = await Offer.find().sort({ order: 1 })
    res.json(offers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const offer = new Offer(req.body)
    await offer.save()
    res.status(201).json(offer)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(offer)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await Offer.findByIdAndDelete(req.params.id)
    res.json({ message: 'تم الحذف' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router