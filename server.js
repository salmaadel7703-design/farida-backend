const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/farida')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err))

app.use('/api/products', require('./routes/products'))
app.use('/api/orders', require('./routes/orders'))
app.use('/api/users', require('./routes/users'))
app.use('/api/slides', require('./routes/slides'))
app.use('/api/offers', require('./routes/offers'))
app.use('/api/coupons', require('./routes/coupons'))
app.use('/api/bundles', require('./routes/bundles'))

app.post('/api/upload', require('./upload').single('image'), (req, res) => {
  res.json({ url: `https://farida-backend-production.up.railway.app/uploads/${req.file.filename}` })
})

app.get('/', (req, res) => {
  res.json({ message: 'فريدة API شغال!' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})