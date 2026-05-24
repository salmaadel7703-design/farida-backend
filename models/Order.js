const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  governorate: { type: String, required: true },
  payMethod: { type: String, required: true },
  items: [
    {
      name: String,
      price: Number,
      qty: Number,
      size: String,
    }
  ],
  total: { type: Number, required: true },
  shipping: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  trackCode: { type: String },
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)