const express = require('express')
const router = express.Router();
const requiresAuth = require('../middleware/requiresAuth')
const validator = require('../validators/user');
const controller = require('../controllers/admin');

router.get('/users', controller.users)
router.get('/setting', controller.setting)
router.post('/setting', controller.updateSetting)

module.exports = router;