const express = require('express')
const router = express.Router();
const requiresAuth = require('../middleware/requiresAuth')
const validator = require('../validators/user');
const controller = require('../controllers/user');

router.get('/me', requiresAuth, controller.me)
router.post('/chat', requiresAuth, controller.sendMessage)
router.post('/draft-profile', validator.draftProfile, requiresAuth, controller.saveDraftProfile)
router.post('/publish-profile', validator.publishProfile, requiresAuth, controller.publishProfile)
router.post('/bot', validator.changeBot, requiresAuth, controller.changeBot)

module.exports = router;