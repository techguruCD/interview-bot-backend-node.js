require('dotenv').config()
const express = require('express')
const cors = require('cors')
const db = require('./db')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
app.use(cors())

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/', express.static(path.join(__dirname, 'build')))

app.use(require('./middleware/getUser'))
app.use('/auth', require('./routes/auth'))
app.use('/user', require('./routes/user'))

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