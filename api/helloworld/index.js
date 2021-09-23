const { Router } = require('express')

const controller = require('./helloworld.controller')

const router = new Router()

// all verbs
// endpoints
router.get('/', controller.index)

module.exports = router
