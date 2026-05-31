const mongoose = require('mongoose')

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true },      // القيمة: 20 مثلاً
  type: { type: String, enum: ['percent', 'fixed'], default: 'percent' }, // % أو جنيه ثابت
  maxUses: { type: Number, default: 100 },
  usedCount: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true })

module.exports = mongoose.model('Coupon', couponSchema)