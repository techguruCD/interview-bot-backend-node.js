const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({
  passError: true,
  statusCode: 400
})

const blog = validator.query(
  Joi.object({
    id: Joi.string().min(1).required().label('id')
  }).required()
)

module.exports = {
  blog
}