/**
 * Auth Local configuration
 */

const Router = require('express').Router
const controller = require('./local.controller')

const router = new Router()

// router.get('/recovery-password', controller.recovery);
// router.get('/forgot-password', controller.forgot);
router.post('/login', controller.login)

module.exports = router
