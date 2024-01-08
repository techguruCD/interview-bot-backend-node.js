const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({
  passError: true,
  statusCode: 400
})

const users = validator.query(
  Joi.object({
    page: Joi.number().min(1).required().label('Page'),
    pageSize: Joi.number().min(1).required().label('Page Size')
  }).required()
)

const blogs = validator.query(
  Joi.object({
    page: Joi.number().min(1).required().label('Page'),
    pageSize: Joi.number().min(1).required().label('Page Size')
  }).required()
)

const createBlog = validator.body(
  Joi.object({
    title: Joi.string().min(1).max(255).required().label('Title'),
    content: Joi.string().min(1).max(5000).required().label('Content'),
    image: Joi.object({
      data: Joi.string().min(1).required(),
      name: Joi.string().min(1).required(),
      content2FileType: Joi.string().min(1).required(),
      content2Extension: Joi.string().min(1).required()
    }).allow(null).optional()
  })
)

const deleteBlog = validator.body(
  Joi.object({
    id: Joi.string().min(1).required().label('id')
  })
)

const updateSetting = validator.body(
  Joi.object({
    usersLimit: Joi.number().min(1).required().label('Users Limit'),
    sitePrompt: Joi.string().min(1).max(5000).label('Site prompt')
  })
)

module.exports = {
  users,
  blogs,
  createBlog,
  deleteBlog,
  updateSetting
}