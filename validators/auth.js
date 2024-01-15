const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({
  passError: true,
  statusCode: 400
})

const signin = validator.body(
  Joi.object({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().min(1).required().label('Password')
  }).required()
)

const signup = validator.body(
  Joi.object({
    email: Joi.string().email().required().label('Email'),
    // name: Joi.string().min(1).pattern(new RegExp('^[a-zA-Z0-9]*$')).required().label('Name'),
    name: Joi.string().min(1).required().label('Name'),
    password: Joi.string().min(1).required().label('Password')
  }).required()
)

module.exports = {
  signin,
  signup
}