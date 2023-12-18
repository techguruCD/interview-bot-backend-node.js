const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({
  passError: true,
  statusCode: 400
})

const profile = validator.body(
  Joi.object({
    about: Joi.string().min(1).max(5000).required().label('About'),
    headline: Joi.string().min(1).max(100).required().label('Title'),
    name: Joi.string().min(1).max(30).required().label('User name'),
    linkedin: Joi.string().allow('').required().label('Linkedin'),
    prompt: Joi.string().allow('').required().label('prompt'),
    greeting: Joi.string().allow('').required().label('greeting'),
    avatar: Joi.any().allow(null).required().label('Avatar'),
    file: Joi.any().allow(null).required().label('File'),
  }).required()
)

module.exports = {
  profile
}