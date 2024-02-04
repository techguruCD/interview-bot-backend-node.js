const fs = require('fs')
const path = require('path')
const { v4: uuid } = require('uuid')
const moment = require('moment')
const { generateMessage } = require("../services/llm")
const llm = require('../services/llm')
const db = require('../db')

exports.me = async (req, res) => {
  res.status(200).send({
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    profile: req.user.profile
  })
}

exports.blogs = async (req, res) => {
  const blogs = await db.blog.findAll({
    where: {
      type: 'blog'
    },
    // limit: 5,
    order: [
      ['createdAt', 'DESC']
    ]
  })
  res.json({
    blogs
  })
}

exports.blog = async (req, res) => {
  const blog = await db.blog.findOne({ where: { urlCaption: req.query.urlCaption } })
  if (!blog) {
    return res.status(400).send({
      message: { error: 'No blog found' }
    })
  }
  res.json({
    blog
  })
}

exports.about = async (req, res) => {
  const about = await db.blog.findOne({where: {type: 'about'}})
  if (!about) {
    return res.status(400).send({
      message: {error: 'About blog not found'}
    })
  }
  res.json({
    about
  })
}

exports.chatbotInit = async (req, res) => {
  try {
    const setting = await db.setting.findOne({})
    await setting.update({
      chatbotIndex: setting.chatbotIndex + 1
    })
    return res.json({
      chatbotGreeting: setting.chatbotGreeting,
      chatbotIndex: setting.chatbotIndex
    })
  } catch (err) {
    return res.status(500).send({
      message: { error: 'Please try again later' }
    })
  }
}

exports.chatbotSendMessage = async (req, res) => {
  try {
    let { messages, chatbotIndex } = req.body

    const setting = await db.setting.findOne({})

    if (chatbotIndex > setting.chatbotIndex) {
      return res.status(400).send({
        message: { error: 'Invalid Chatbot Index' }
      })
    }
    const message = await generateMessage({ profileId: '0', sitePrompt: setting.sitePrompt, profilePrompt: setting.chatbotPrompt, messages })
    if (message) {
      await db.chatbotquestion.create({
        question: messages[messages.length - 1].content,
        answer: message,
        chatbotIndex: chatbotIndex
      })
      return res.json({ data: message })
    }
    throw ('now message')
  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: { error: 'Please try again later' } })
  }
}