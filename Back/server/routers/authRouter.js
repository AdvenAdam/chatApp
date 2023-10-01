const express = require('express')
const validateForm = require('../controller/express/validateForm')
const router = express.Router()
const { rateLimiter } = require('../controller/express/rateLimiter')

const {
    handleLogin,
    attemptLogin,
    attemptRegister,
} = require('../controller/authController')

router
    .route('/login')
    .get(handleLogin)
    .post(validateForm, rateLimiter(60, 10), attemptLogin)

router.post('/signup', validateForm, rateLimiter(30, 4), attemptRegister)

module.exports = router
