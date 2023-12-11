const express = require('express')
const router = express.Router();
const requiresAuth = require('../middleware/requiresAuth')
// const validator = require('../validators/auth')
const controller = require('../controllers/user')

router.get('/me', requiresAuth, controller.me)
router.post('/chat', requiresAuth, controller.sendMessage)
router.post('/draft-profile', requiresAuth, controller.saveDraftProfile)
router.post('/publish-profile', requiresAuth, controller.publishProfile)

module.exports = router;