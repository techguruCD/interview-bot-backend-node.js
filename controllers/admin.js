const path = require('path')
const fs = require('fs')
const { v4: uuid } = require('uuid')
const db = require('../db')
const llm = require('../services/llm')
const { PDFLoader } = require('langchain/document_loaders/fs/pdf')
const { DocxLoader } = require('langchain/document_loaders/fs/docx')
const moment = require('moment')

exports.users = async (req, res) => {
    const { page, pageSize } = req.query
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
    const { page, pageSize = 10 } = req.query
    const totalCount = await db.blog.count() - 1
    const totalPage = Math.ceil(totalCount / pageSize)
    const blogs = await db.blog.findAll({
        where: { type: 'blog' },
        limit: pageSize,
        offset: pageSize * (page - 1),
        order: [
            ['createdAt', 'DESC']
        ]
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
    const { title, content, image } = req.body;
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

    let originUrlCaption = title.replace(/[^a-zA-Z0-9 ]/g, '').replace(/[ ]/g, '-').toLowerCase()
    let urlCaption;

    for (let j = 0; ; j++) {
        urlCaption = originUrlCaption
        if (j) urlCaption += '' + j;
        if (!(await db.blog.findOne({ where: { urlCaption } })))
            break;
    }

    draftBlog.urlCaption = urlCaption;

    const blog = await db.blog.create(draftBlog)
    return res.json({
        blog,
        message: { success: 'Blog created successfully' }
    })
}

exports.updateBlog = async (req, res) => {
    const { title, content, image } = req.body;
    const { id } = req.query
    const draftBlog = {
        title, content
    }
    const blog = await db.blog.findOne({ where: { id } })
    if (!blog) {
        return res.status(400).send({
            message: { error: 'Blog not found' }
        })
    }
    try {
        if (blog.image != image) {
            if (blog.image) {
                try {
                    fs.unlinkSync(path.join(__dirname, '../', blog.image))
                } catch (err) { console.log(err) }
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
            } else {
                draftBlog.image = null
            }
        }

        let originUrlCaption = title.replace(/[^a-zA-Z0-9 ]/g, '').replace(/[ ]/g, '-').toLowerCase()
        let urlCaption;

        for (let j = 0; ; j++) {
            urlCaption = originUrlCaption
            if (j) urlCaption += '' + j;
            if (!(await db.blog.findOne({ where: { urlCaption, id: {[db.Sequelize.Op.ne]: blog.id} } })))
                break;
        }

        draftBlog.urlCaption = urlCaption

        await blog.update(draftBlog)
        return res.json({
            blog,
            message: { success: 'Blog updated successfully' }
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            message: { error: 'Please try again later' }
        })
    }
}

exports.deleteBlog = async (req, res) => {
    const { id } = req.body;
    await db.blog.destroy({
        where: { id }
    })
    return res.json({
        message: { success: 'Blog deleted' }
    })
}

exports.setting = async (req, res) => {
    const setting = await db.setting.findOne({})
    return res.json({
        data: setting
    })
}

exports.updateSetting = async (req, res) => {
    const { usersLimit, sitePrompt, chatbotGreeting, chatbotPrompt } = req.body
    const setting = await db.setting.findOne({});
    await setting.update({
        usersLimit, sitePrompt, chatbotGreeting, chatbotPrompt
    })
    res.json({
        message: { success: 'Settings updated successfully' }
    })
}

exports.chatbotAddFile = async (req, res) => {
    try {
        const { data, name, content2Extension } = req.body;
        const base64Data = data.split(',')[1];
        const decodedData = Buffer.from(base64Data, 'base64')
        const id = uuid()
        const fileName = `/uploads/${id}.${content2Extension}`
        try {
            fs.mkdirSync(path.join(__dirname, '../uploads'))
        } catch (err) { }
        const filePath = path.join(__dirname, '../', fileName)
        fs.writeFileSync(filePath, decodedData)

        let docs = null;
        if (content2Extension == 'pdf') {
            const loader = new PDFLoader(path.join(__dirname, '../', fileName),)
            loader.
                docs = (await loader.load()).map(doc => ({
                    pageContent: doc.pageContent,
                    metadata: {
                        profileId: '0',
                        fileId: id,
                        type: 'cv'
                    }
                }))
        } else if (content2Extension == 'docx') {
            const loader = new DocxLoader(path.join(__dirname, '../', fileName))
            docs = (await loader.load()).map(doc => ({
                pageContent: doc.pageContent,
                metadata: {
                    profileId: '0',
                    fileId: id,
                    type: 'cv'
                }
            }))
        } else {
            return res.statsu(400).send({
                message: { error: 'Please select PDF or DOCX' }
            })
        }

        console.log(docs)

        await llm.saveDocsEmbedding({ docs })

        const setting = await db.setting.findOne({})
        await setting.update({
            chatbotFiles: [
                ...setting.chatbotFiles,
                {
                    id, name, type: content2Extension, path: fileName, createdAt: moment().utc().format('yyyy-MM-DD HH:mm:ss')
                }
            ]
        })
        // await llm.saveFileEmbedding({fileName, fileId: id, profileId: profile.id})
        // await llm.saveEmbedding({ profileId: profile.id, file: profile.file, profile: profile.about })
        res.send({
            data: setting.chatbotFiles,
            message: { success: 'Uploaded successfully' }
        })
    } catch (err) {
        console.log(err)
        return res.status(400).send({
            message: { error: 'Please try again later' }
        })
    }
}

exports.chatbotDeleteFile = async (req, res) => {
    const { id } = req.body
    const setting = await db.setting.findOne({})
    const index = setting.chatbotFiles.findIndex(file => file.id == id)
    if (index < 0) {
        return res.status(400).send({ message: { error: 'File not found' } })
    }
    const file = setting.chatbotFiles[index];
    try {
        fs.unlinkSync(path.join(__dirname, '../', file.path))
    } catch (err) { console.log(err) }
    await setting.update({
        chatbotFiles: [...setting.chatbotFiles.slice(0, index), ...setting.chatbotFiles.slice(index + 1)]
    })
    await llm.delFileEmbedding({ profileId: '0', fileName: file.name, fileId: file.id })
    res.send({
        data: setting.chatbotFiles,
        message: { success: 'File deleted successfully' }
    })
}

exports.chatbotQuestions = async (req, res) => {
    try {
        const { page, pageSize } = req.query
        const totalCount = await db.chatbotquestion.count({})
        const totalPage = Math.ceil(totalCount / pageSize)
        const chatbotQuestions = await db.chatbotquestion.findAll({
            limit: pageSize,
            offset: pageSize * (page - 1),
            order: [
                ['createdAt', 'DESC']
            ]
        })
        return res.json({
            data: {
                questions: chatbotQuestions,
                page,
                totalPage: totalPage || 1,
                totalCount
            },
        })
    } catch (err) {
        return res.status(400).send({
            message: { error: 'Please try again later.' }
        })
    }
}

exports.updateAbout = async (req, res) => {
    try {
        const { content } = req.body;
        const about = await db.blog.findOne({ where: { type: 'about' } })
        await about.update({ content })
        return res.json({
            about,
            message: { success: 'About blog updated successfully' }
        })
    } catch (err) {
        return res.status(500).send({
            message: { error: 'Please try again later.' }
        })
    }
}