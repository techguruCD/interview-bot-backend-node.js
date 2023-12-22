const express = require('express')
const router = express.Router();
const requiresAuth = require('../middleware/requiresAuth')
const validator = require('../validators/normal');
const controller = require('../controllers/normal');

router.get('/me', requiresAuth, controller.me)
router.get('/blogs', controller.blogs)
router.get('/blog', validator.blog, controller.blog)

module.exports = router;