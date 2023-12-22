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
        limit: 5,
    })
    res.json({
        blogs
    })
}

exports.blog = async(req, res) => {
    const blog = await db.blog.findOne({where: {id: req.query.id}})
    if (!blog) {
        return res.status(400).send({
            message: {error: 'No blog found'}
        })
    }
    res.json({
        blog
    })
}