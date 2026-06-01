const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  address: { type: String, required: true },
  governorate: { type: String, required: true },
  payMethod: { type: String, required: true },
  vodafonePhone: { type: String },
  paidAmount: { type: Number },
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
  coupon: { type: String, default: '' },
  discount: { type: Number, default: 0 },
  status: { type: String, default: 'جاري التجهيز' },
  trackCode: { type: String },
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)