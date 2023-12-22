require('dotenv').config()
const express = require('express')
const cors = require('cors')
const db = require('./db')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
app.use(cors())

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/', express.static(path.join(__dirname, 'build')))

app.use('/api', require('./middleware/getUser'))
app.use('/api', require('./routes/normal'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/user', require('./routes/user'))
app.use('/api/admin', require('./routes/admin'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'))
})

app.use((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    res.status(400).send({
      message: { error: err.error.toString() },
      isJoi: true,
      errors: err.error.details
    });
  } else {
    // pass on to another error handler
    next(err);
  }
})

async function connectDB() {
  await db.sequelize.authenticate();
  console.log('Connected to database')
}

async function main() {
  await connectDB()
  const PORT = process.env.PORT || 5000
  await app.listen(PORT, '0.0.0.0')
  console.log('Listening to', PORT)
}

main()