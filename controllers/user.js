const fs = require('fs')
const path = require('path')
const { generateMessage } = require("../services/llm")
const llm = require('../services/llm')
const db = require('../db')

exports.me = async (req, res) => {
  res.status(200).send({
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,
    profile: req.user.profile
  })
}

exports.sendMessage = async (req, res) => {
  if (!req.user.profile) {
    return res.status(404).send({
      message: { error: 'No profile is published' }
    })
  }
  const message = await generateMessage(req.user, req.body.messages)
  if (message)
    return res.json({ data: message })
  return res.status(500).send({ message: { error: 'Please try again later' } })
}

exports.updateProfile = async (req, res) => {
  const { name, about, headline, linkedin, website, prompt, greeting, avatar, file } = req.body;
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

    if (req.user.profile?.file != file) {
      if (req.user.profile?.file) {
        try {
          fs.unlinkSync(path.join(__dirname, '../', req.user.profile.file))
        } catch (err) { console.log(err) }
      }
      if (file) {
        const base64Data = file.data.split(',')[1];
        const decodedData = Buffer.from(base64Data, 'base64')
        const timestamp = '' + new Date().getTime()
        const fileName = `/uploads/${timestamp}_${file.name}`
        try {
          fs.mkdirSync(path.join(__dirname, '../uploads'))
        } catch (err) { }
        const filePath = path.join(__dirname, '../', fileName)
        fs.writeFileSync(filePath, decodedData)
        draftProfile.file = fileName
      } else {
        draftProfile.file = null
      }
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
        const fileName = `/uploads/${timestamp}_${avatar.name}`
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
    await llm.saveEmbedding({ profileId: profile.id, file: profile.file, profile: profile.about })
    res.status(200).send({
      data: profile,
      message: { success: 'Profile updated' }
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: { error: err.message } })
  }
}