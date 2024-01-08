const express = require('express')
const router = express.Router();
const requiresAuth = require('../middleware/requiresAuth')
const validator = require('../validators/user');
const controller = require('../controllers/user');

router.post('/chat', controller.sendMessage)
router.post('/chat-init', controller.chatInit)
router.post('/update-profile', validator.profile, requiresAuth, controller.updateProfile)
router.post('/add-file', validator.addFile, requiresAuth, controller.addFile)
router.post('/delete-file', validator.deleteFile, requiresAuth, controller.deleteFile)
router.get('/questions', validator.questions, requiresAuth, controller.questions)

module.exports = router;