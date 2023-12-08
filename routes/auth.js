const express = require('express')
const router = express.Router();
const validator = require('../validators/auth')
const controller = require('../controllers/auth')

router.post('/signin/email', validator.signin, controller.signin)
// router.post('/signin/google', validator.signin, controller.signin)
// router.post('/signin/linkedin', validator.signin, controller.signin)
router.post('/signup/email', validator.signup, controller.signup)
router.post('/signup/google', validator.signup, controller.signup)
router.post('/signup/linkedin', validator.signup, controller.signup)

module.exports = router;