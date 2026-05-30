const mongoose = require('mongoose')

const offerSchema = new mongoose.Schema({
  title: { type: String },
  discount: { type: String },
  sub: { type: String },
  image: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true })

module.exports = mongoose.model('Offer', offerSchema)