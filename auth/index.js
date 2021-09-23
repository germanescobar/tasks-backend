/**
 * Auth configuration
 * @author: Cristian Moreno Zulauaga <khriztianmoreno@gmail.com>
 */

const express = require('express')

const localSetup = require('./local')

const router = express.Router()

router.use('/local', localSetup)

module.exports = router
