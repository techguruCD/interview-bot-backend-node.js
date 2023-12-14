const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({
  passError: true,
  statusCode: 400
})

const draftProfile = validator.body(
  Joi.object({
    about: Joi.string().min(1).max(5000).required().label('About'),
    headline: Joi.string().min(1).max(100).required().label('Title'),
    name: Joi.string().min(1).max(30).required().label('User name'),
    linkedin: Joi.string().allow('').required().label('Linkedin'),
    website: Joi.string().allow('').required().label('Website'),
    avatar: Joi.any().allow(null).required().label('Avatar'),
    file: Joi.any().allow(null).required().label('File'),
  }).required()
)

const publishProfile = validator.body(
  Joi.object({}).required()
)

const changeBot = validator.body(
  Joi.object({
    prompt: Joi.string().min(1).max(5000).required().label('Prompt'),
    greeting: Joi.string().min(1).max(200).required().label('Greeting Sentence')
  }).required()
)

module.exports = {
  draftProfile,
  publishProfile,
  changeBot
}