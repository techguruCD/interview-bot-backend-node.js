const jwt = require("jsonwebtoken")
const db = require('../db')
const { initConversationChain } = require("../services/llm")

const getUser = (req, res, next) => {
  let token = req.headers['authorization']
  if (!token) {
    next()
    return;
  }
  jwt.verify(
    token,
    process.env.JWT_SECRET,
    async (err, decoded) => {
      if (err) {
        next()
        return;
      }
      const userId = decoded.id
      try {
        let user = await db.user.findOne({
          where: {
            id: userId
          },
          include: [
            {
              model: db.draftProfile,
              as: 'draftProfile'
            },
            {
              model: db.profile,
              as: 'profile',
            },
            {
              model: db.bot,
              as: 'bot',
            }
          ]
        });
        if (user) {
          req.user = user;
          await initConversationChain(user)
        }
        next();
      } catch (err) {
        console.log(err)
        return res.status(500).send({
          message: { error: "Unable to validate user" }
        })
      }
    })
}

module.exports = getUser