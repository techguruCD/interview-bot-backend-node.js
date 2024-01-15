const express = require('express')
const router = express.Router();
const requiresAdmin = require('../middleware/requiresAdmin')
const validator = require('../validators/admin');
const controller = require('../controllers/admin');

router.get('/users', validator.users, requiresAdmin, controller.users)
router.get('/blogs', validator.blogs, requiresAdmin, controller.blogs)
router.post('/create-blog', validator.createBlog, requiresAdmin, controller.createBlog)
router.post('/update-blog', validator.updateBlogQuery, validator.updateBlogBody, requiresAdmin, controller.updateBlog)
router.post('/delete-blog', validator.deleteBlog, requiresAdmin, controller.deleteBlog)
router.get('/setting', requiresAdmin, controller.setting)
router.post('/setting', validator.updateSetting, requiresAdmin, controller.updateSetting)
router.post('/setting-add-file', validator.chatbotAddFile, requiresAdmin, controller.chatbotAddFile)
router.post('/setting-delete-file', validator.chatbotDeleteFile, requiresAdmin, controller.chatbotDeleteFile)
router.get('/chatbot-questions', validator.chatbotQuestions, requiresAdmin, controller.chatbotQuestions)

module.exports = router;