const mongoose = require('mongoose')

const bundleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleEn: { type: String },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  bundlePrice: { type: Number, required: true },
  image: { type: String },
  active: { type: Boolean, default: true },
}, { timestamps: true })

module.exports = mongoose.model('Bundle', bundleSchema)