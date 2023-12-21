const express = require('express')
const router = express.Router();
const requiresAuth = require('../middleware/requiresAuth')
const validator = require('../validators/user');
const controller = require('../controllers/user');

router.get('/me', requiresAuth, controller.me)

module.exports = router;