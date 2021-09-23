/**
 * Upload File
 */

const {Router} = require('express')
const controller = require('./upload.controller')

const router = new Router()

router.post('/', controller.upload)

module.exports = router
