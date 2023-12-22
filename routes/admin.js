const express = require('express')
const router = express.Router();
const requiresAdmin = require('../middleware/requiresAdmin')
const validator = require('../validators/admin');
const controller = require('../controllers/admin');

router.get('/users', requiresAdmin, validator.users, controller.users)
router.get('/blogs', requiresAdmin, validator.blogs, controller.blogs)
router.post('/create-blog', requiresAdmin, validator.createBlog, controller.createBlog)
router.post('/delete-blog', requiresAdmin, validator.deleteBlog, controller.deleteBlog)
router.get('/setting', requiresAdmin, controller.setting)
router.post('/setting', requiresAdmin, validator.updateSetting, controller.updateSetting)

module.exports = router;