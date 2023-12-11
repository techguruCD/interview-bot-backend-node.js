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
  const message = await generateMessage(req.user, req.body.messages)
  if (message)
    return res.json({data: message})
  return res.status(500).send({message: {error: 'Please try again later'}})
}

exports.saveDraftProfile = async (req, res) => {
  const { name, about, headline, linkedin, website, avatar, file, isFileChanged } = req.body;
  try {

    const draftData = {
      id: req.user.draftProfile?.id,
      name, about, headline, linkedin, website,
      userId: req.user.id,
      isFileChanged
    }

    if (isFileChanged) {
      if (file) {
        const base64Data = file.data.split(',')[1];
        const decodedData = Buffer.from(base64Data, 'base64')
        const timestamp = '' + new Date().getTime()
        const fileName = `/uploads/${timestamp}/${file.name}`
        try {
          fs.mkdirSync(path.join(__dirname, '../uploads'))
        } catch (err) { }
        try {
          fs.mkdirSync(path.join(__dirname, '../uploads', timestamp))
        } catch (err) { }
        const filePath = path.join(__dirname, '../', fileName)
        fs.writeFileSync(filePath, decodedData)
        draftData.file = fileName
      } else {
        draftData.file = null;
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
      userId: draftProfile.userId
    }
    if (draftProfile.isFileChanged)
      draftData.file = draftProfile.file
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