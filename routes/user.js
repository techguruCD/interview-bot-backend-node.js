const express = require('express')
const router = express.Router();
const requiresAuth = require('../middleware/requiresAuth')
const validator = require('../validators/user');
const controller = require('../controllers/user');

router.get('/me', requiresAuth, controller.me)
router.post('/chat', requiresAuth, controller.sendMessage)
router.post('/update-profile', validator.profile, requiresAuth, controller.updateProfile)
router.post('/add-file', validator.addFile, requiresAuth, controller.addFile)
router.post('/delete-file', validator.deleteFile, requiresAuth, controller.deleteFile)

module.exports = router;