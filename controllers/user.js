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
    profile: req.user.profile,
    draftProfile: req.user.draftProfile,
    bot: req.user.bot
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

exports.saveDraftProfile = async (req, res) => {
  const { name, about, headline, linkedin, website, avatar, file } = req.body;
  try {
    const draftData = {
      id: req.user.draftProfile?.id,
      name, about, headline, linkedin, website,
      userId: req.user.id,
    }

    if (req.user.draftProfile?.file != file) {
      if (req.user.draftProfile?.file && req.user.draftProfile?.file != req.user.profile?.file) {
        try {
          fs.unlinkSync(path.join(__dirname, '../', req.user.draftProfile?.file))

        } catch (err) { console.log(err) }
      }
      if (file && file != req.user.profile?.file) {
        const base64Data = file.data.split(',')[1];
        const decodedData = Buffer.from(base64Data, 'base64')
        const timestamp = '' + new Date().getTime()
        const fileName = `/uploads/${timestamp}_${file.name}`
        try {
          fs.mkdirSync(path.join(__dirname, '../uploads'))
        } catch (err) { }
        const filePath = path.join(__dirname, '../', fileName)
        fs.writeFileSync(filePath, decodedData)
        draftData.file = fileName
      } else {
        draftData.file = file
      }
    }

    if (req.user.draftProfile?.avatar != avatar) {
      if (req.user.draftProfile?.avatar && req.user.draftProfile?.avatar != req.user.profile?.avatar) {
        try {
          fs.unlinkSync(path.join(__dirname, '../', req.user.draftProfile?.avatar))

        } catch (err) { console.log(err) }
      }
      if (avatar && avatar != req.user.profile?.avatar) {
        const base64Data = avatar.data.split(',')[1];
        const decodedData = Buffer.from(base64Data, 'base64')
        const timestamp = '' + new Date().getTime()
        const fileName = `/uploads/${timestamp}_${avatar.name}`
        try {
          fs.mkdirSync(path.join(__dirname, '../uploads'))
        } catch (err) { }
        const filePath = path.join(__dirname, '../', fileName)
        fs.writeFileSync(filePath, decodedData)
        draftData.avatar = fileName
      } else {
        draftData.avatar = avatar
      }
    }

    const [draftProfile, created] = await db.draftProfile.upsert(draftData)
    res.status(200).send({
      data: draftProfile,
      message: { success: 'Draft saved' }
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: { error: err.message } })
  }
}

exports.publishProfile = async (req, res) => {
  try {
    const draftProfile = req.user.draftProfile
    if (!draftProfile) {
      res.status(404).send({ message: { error: 'No draft' } })
      return;
    }
    const draftData = {
      id: req.user.profile?.id,
      name: draftProfile.name,
      headline: draftProfile.headline,
      about: draftProfile.about,
      linkedin: draftProfile.linkedin,
      website: draftProfile.website,
      file: draftProfile.file,
      userId: draftProfile.userId,
      avatar: draftProfile.avatar
    }
    if (req.profile?.file && req.profile?.file != draftData.file) {
      try {
        fs.unlink(path.join(__dirname, '../', req.profile?.file))
      } catch (err) { }
    }
    if (req.profile?.avatar && req.profile?.avatar != draftData.avatar) {
      try {
        fs.unlink(path.join(__dirname, '../', req.profile?.avatar))
      } catch (err) { }
    }
    const [profile, created] = await db.profile.upsert(draftData)
    await llm.saveEmbedding(profile)
    await db.draftProfile.destroy({ where: { userId: draftProfile.userId } })
    res.status(200).send({
      data: profile,
      message: { success: 'Profile published' }
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: { error: err.message } })
  }
}

exports.changeBot = async(req, res) => {
  const [bot, created] = await db.bot.upsert({
    id: req.user.bot?.id,
    prompt: req.body.prompt,
    greeting: req.body.greeting,
    userId: req.user.id
  })
  res.status(200).send({
    data: bot,
    message: {
      success: 'Bot changed'
    }
  })
}