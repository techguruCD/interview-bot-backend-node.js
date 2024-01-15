const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const Handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')

const db = require('../db')
const { saveEmbedding, delEmbedding } = require('../services/llm.js')

exports.signup = async (req, res) => {
  try {
    const { email, name, password, role = "user" } = req.body
    if (!name.match('^[a-zA-Z0-9]*$')) {
      return res.status(400).send({
        errors: {name: 'Name should be a-z, A-Z, 0-9 characters.'},
        message: {error: 'Name should be a-z, A-Z, 0-9 characters.'}
      })
    }
    const totalCount = await db.user.count({where: {role: 'USER'}})
    const setting = await db.setting.findOne({})
    if (setting.usersLimit <= totalCount) {
      return res.status(400).send({
        message: {error: `Users limited to ${setting.usersLimit}`}
      })
    }
    let chatId = name.toLowerCase()
    const chatIds = await db.profile.findAll({
      attributes: ['chatId'],
      where: {
        chatId: {
          [db.Sequelize.Op.like]: chatId + '%'
        }
      }
    })
    for (let i = 0; i <= chatIds.length; i++) {
      let targetChatId = chatId;
      if (i)
        targetChatId += i;
      if (i == chatIds.length) {
        chatId = targetChatId;
        break;
      }
      if (targetChatId != chatIds[i].chatId) {
        chatId = targetChatId;
        break;
      }
    }
    console.log('------------')
    console.log(chatId)
    console.log('============')
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
    const prompt = Handlebars.compile(fs.readFileSync(path.join(__dirname, '../configs/prompts/chat.hbs'), 'utf-8'))({ user }, { allowProtoPropertiesByDefault: true })
    const greeting = Handlebars.compile(fs.readFileSync(path.join(__dirname, '../configs/initialMessage.hbs'), 'utf-8'))({ user }, { allowProtoPropertiesByDefault: true })
    const profile = await db.profile.create({
      userId: user.id,
      name: user.name,
      status: "share",
      chatId,
      prompt,
      greeting
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