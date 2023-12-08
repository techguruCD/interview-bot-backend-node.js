require('dotenv').config()
const express = require('express')
const cors = require('cors')
const db = require('./db')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(require('./middleware/getUser'))
app.use('/auth', require('./routes/auth'))
app.use('/user', require('./routes/user'))

async function main() {
  const promises = [
    db.sequelize.authenticate().then(() => console.log('Connected to database')),
  ]
  await Promise.all(promises)
  const PORT = process.env.PORT || 5000
  await app.listen(PORT, '0.0.0.0')
  console.log('Listening to', PORT)
}

main()