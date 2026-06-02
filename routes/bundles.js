const router = require('express').Router()
const Bundle = require('../models/Bundle')

router.get('/', async (req, res) => {
  const bundles = await Bundle.find().populate('products')
  res.json(bundles)
})

router.post('/', async (req, res) => {
  const bundle = await Bundle.create(req.body)
  const populated = await bundle.populate('products')
  res.json(populated)
})

router.delete('/:id', async (req, res) => {
  await Bundle.findByIdAndDelete(req.params.id)
  res.json({ success: true })
})

module.exports = router