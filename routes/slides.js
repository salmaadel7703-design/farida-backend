const express = require('express')
const router = express.Router()
const Slide = require('../models/Slide')

router.get('/', async (req, res) => {
  try {
    const slides = await Slide.find().sort({ order: 1 })
    res.json(slides)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const slide = new Slide(req.body)
    await slide.save()
    res.status(201).json(slide)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const slide = await Slide.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(slide)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await Slide.findByIdAndDelete(req.params.id)
    res.json({ message: 'تم الحذف' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router