const fs = require('fs')
const path = require('path')
const { v4: uuid } = require('uuid')
const moment = require('moment')
const { generateMessage } = require("../services/llm")
const llm = require('../services/llm')
const db = require('../db')
const { PDFLoader } = require('langchain/document_loaders/fs/pdf')
const { DocxLoader } = require('langchain/document_loaders/fs/docx')

exports.sendMessage = async (req, res) => {
  const { chatId, messages } = req.body
  const profile = await db.profile.findOne({ where: { chatId } })
  const setting = await db.setting.findOne({})
  const message = await generateMessage({profileId: profile.id, sitePrompt: setting.sitePrompt, profilePrompt: profile.prompt, messages})
  if (message)
    return res.json({ data: message })
  return res.status(500).send({ message: { error: 'Please try again later' } })
}

exports.profileGreeting = async (req, res) => {
  const { chatId } = req.query;
  console.log(chatId)

  const profile = await db.profile.findOne({ where: { chatId } })
  if (!profile) {
    return res.status(400).send({
      message: { error: 'No chat found' }
    })
  }
  return res.json({
    data: {
      avatar: profile.avatar,
      greeting: profile.greeting,
      name: profile.name
    }
  })
}

exports.updateProfile = async (req, res) => {
  const { name, about, headline, linkedin, website, prompt, greeting, avatar } = req.body;
  const profile = await db.profile.findOne({ where: { id: req.user.profile.id } })
  try {
    const draftProfile = {
      name,
      about,
      headline,
      linkedin,
      website,
      prompt,
      greeting
    }

    if (req.user.profile?.avatar != avatar) {
      if (req.user.profile?.avatar) {
        try {
          fs.unlinkSync(path.join(__dirname, '../', req.user.profile?.avatar))
        } catch (err) { console.log(err) }
      }
      if (avatar) {
        const base64Data = avatar.data.split(',')[1];
        const decodedData = Buffer.from(base64Data, 'base64')
        const timestamp = '' + new Date().getTime()
        const fileName = `/uploads/avatar_${timestamp}.${avatar.content2Extension}`
        try {
          fs.mkdirSync(path.join(__dirname, '../uploads'))
        } catch (err) { }
        const filePath = path.join(__dirname, '../', fileName)
        fs.writeFileSync(filePath, decodedData)
        draftProfile.avatar = fileName
      } else {
        draftProfile.avatar = null
      }
    }
    await profile.update(draftProfile)
    await llm.saveProfileEmbedding({profileId: profile.id, content: profile.about})
    // await llm.saveEmbedding({ profileId: profile.id, file: profile.file, profile: profile.about })
    res.status(200).send({
      data: profile,
      message: { success: 'Profile updated' }
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: { error: err.message } })
  }
}

exports.addFile = async (req, res) => {
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
      const loader = new PDFLoader(path.join(__dirname, '../', fileName))
      docs = (await loader.load()).map(doc => ({
        pageContent: doc.pageContent,
        metadata: {
          profileId: req.user.profile.id,
          fileId: id,
          type: 'cv'
        }
      }))
    } else if (content2Extension == 'docx') {
      const loader = new DocxLoader(path.join(__dirname, '../', fileName))
      docs = (await loader.load()).map(doc => ({
        pageContent: doc.pageContent,
        metadata: {
          profileId: req.user.profile.id,
          fileId: id,
          type: 'cv'
        }
      }))
    } else {
      return res.statsu(400).send({
        message: {error: 'Please select PDF or DOCX'}
      })
    }

    console.log(docs)

    await llm.saveDocsEmbedding({docs})
  
    const profile = await db.profile.findOne({ where: { id: req.user.profile.id } })
    await profile.update({
      files: [
        ...profile.files,
        {
          id, name, type: content2Extension, path: fileName, createdAt: moment().utc().format('yyyy-MM-DD HH:mm:ss')
        }
      ]
    })
    // await llm.saveFileEmbedding({fileName, fileId: id, profileId: profile.id})
    // await llm.saveEmbedding({ profileId: profile.id, file: profile.file, profile: profile.about })
    res.send({
      data: profile.files,
      message: { success: 'Uploaded successfully' }
    })
  } catch (err) {
    return res.status(400).send({
      message: {error: 'Please try again later'}
    })
  }
}

exports.deleteFile = async (req, res) => {
  const { id } = req.body
  const profile = await db.profile.findOne({ where: { id: req.user.profile.id } })
  const index = profile.files.findIndex(file => file.id == id)
  if (index < 0) {
    return res.status(400).send({ message: { error: 'File not found' } })
  }
  const file = profile.files[index];
  try {
    fs.unlinkSync(path.join(__dirname, '../', file.path))
  } catch (err) { console.log(err) }
  await profile.update({
    files: [...profile.files.slice(0, index), ...profile.files.slice(index + 1)]
  })
  await llm.delFileEmbedding({profileId: profile.id, fileName: file.name, fileId: file.id})
  res.send({
    data: profile.files,
    message: { success: 'File deleted successfully' }
  })
}