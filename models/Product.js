const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameEn: { type: String },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  badge: { type: String },
  badgeEn: { type: String },
  cat: { type: String, required: true },
  stock: { type: Number, default: 0 },
  image: { type: String },
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)