const mongoose = require('mongoose')

const slideSchema = new mongoose.Schema({
  tag: { type: String },
  title: { type: String },
  titleGold: { type: String },
  sub: { type: String },
  btn: { type: String },
  image: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true })

module.exports = mongoose.model('Slide', slideSchema)