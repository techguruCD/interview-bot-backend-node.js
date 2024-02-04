const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({
  passError: true,
  statusCode: 400
})

const blog = validator.query(
  Joi.object({
    urlCaption: Joi.string().min(1).required().label('Url caption')
  }).required()
)

const chatbotSendMessage = validator.body(
  Joi.object({
    messages: Joi.array().items(
      Joi.object({
        role: Joi.string().min(1).required(),
        content: Joi.string().min(1).required()
      })
    ).min(1).required().label('Messages'),
    chatbotIndex: Joi.number().min(1).required().label('Chatbot index')
  }).required()
)

module.exports = {
  blog,
  chatbotSendMessage
}