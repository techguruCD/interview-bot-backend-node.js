const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const Handlebars = require('handlebars')
const fs = require('fs')
const db = require('../db')
const path = require('path')

exports.signup = async (req, res) => {
  try {
    const { email, name, password, role = "user", status = "1" } = req.body
    const [user, created] = await db.user.findOrCreate({
      where: { email },
      defaults: {
        email,
        name,
        password: bcrypt.hashSync(password, 8)
      }
    })
    if (!created) {
      return res.status(500).send({ message: { error: 'User exists' } })
    }
    await db.profile.create({
      userId: user.id,
      name: user.name
    })
    await db.bot.create({
      userId: user.id,
      prompt: Handlebars.compile(fs.readFileSync(path.join(__dirname, '../configs/prompts/chat.hbs'), 'utf-8'))({user}, {allowProtoPropertiesByDefault: true}),
      greeting: Handlebars.compile(fs.readFileSync(path.join(__dirname, '../configs/initialMessage.hbs'), 'utf-8'))({user}, {allowProtoPropertiesByDefault: true})
    })
    return res.status(200).send({})
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: { error: err.message } })
  }
}

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await db.user.findOne({ where: { email, thirdPartyAuth: null } })
    if (!user) {
      return res.status(401).send({
        message: { error: "Invalid credentials" }
      })
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password)
    if (!passwordIsValid) {
      return res.status(401).send({
        message: { error: "Invalid credentials" }
      })
    }
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 1814400, //21 days
      }
    )
    res.status(200).send({ token })
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: { error: 'Please try again later' } })
  }
}