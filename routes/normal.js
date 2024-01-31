const express = require('express')
const router = express.Router();
const requiresAuth = require('../middleware/requiresAuth')
const validator = require('../validators/normal');
const controller = require('../controllers/normal');

router.get('/me', requiresAuth, controller.me)
router.get('/blogs', controller.blogs)
router.get('/blog', validator.blog, controller.blog)
router.get('/about', controller.about)
router.get('/chatbot-init', controller.chatbotInit)
router.post('/chatbot-sendMessage', validator.chatbotSendMessage, controller.chatbotSendMessage)

module.exports = router;