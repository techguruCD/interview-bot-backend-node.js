const path = require('path')
const fs = require('fs')
const db = require('../db')

exports.users = async (req, res) => {
    const {page, pageSize} = req.query
    const totalCount = await db.user.count()
    const totalPage = Math.ceil(totalCount / pageSize)
    const users = await db.user.findAll({
        limit: pageSize,
        offset: pageSize * (page - 1),
        include: [
            {
              model: db.profile,
              as: 'profile',
            }
        ]
    })
    return res.json({
        data: {
            users,
            page,
            totalPage,
            totalCount
        },
    })
}

exports.blogs = async (req, res) => {
    const {page, pageSize = 10} = req.query
    const totalCount = await db.blog.count()
    const totalPage = Math.ceil(totalCount / pageSize)
    const blogs = await db.blog.findAll({
        limit: pageSize,
        offset: pageSize * (page - 1)
    })
    return res.json({
        data: {
            blogs,
            page,
            totalPage,
            totalCount
        },
    })
}

exports.createBlog = async (req, res) => {
    const {title, content, image} = req.body;
    const draftBlog = {
        title, content
    }
    if (image) {
        const base64Data = image.data.split(',')[1];
        const decodedData = Buffer.from(base64Data, 'base64')
        const timestamp = '' + new Date().getTime()
        const fileName = `/uploads/blog_${timestamp}.${image.content2Extension}`
        try {
            fs.mkdirSync(path.join(__dirname, '../uploads'))
        } catch (err) { }
        const filePath = path.join(__dirname, '../', fileName)
        fs.writeFileSync(filePath, decodedData)
        draftBlog.image = fileName
    }

    const blog = await db.blog.create(draftBlog)
    return res.json({
        data: blog,
        message: {success: 'Blog created successfully'}
    })
}

exports.deleteBlog = async (req, res) => {
    const {id} = req.body;
    await db.blog.destroy({
        where: {id}
    })
    return res.json({
        message: {success: 'Blog deleted'}
    })
}

exports.setting = async (req, res) => {
    const setting = await db.setting.findOne({})
    return res.json({
        data: setting
    })
}

exports.updateSetting = async (req, res) => {
    const {usersLimit, sitePrompt} = req.body
    const setting = await db.setting.findOne({});
    await setting.update({
        usersLimit, sitePrompt
    })
    res.json({
        message: {success: 'Settings updated successfully'}
    })
}