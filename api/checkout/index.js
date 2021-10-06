const { Router } = require('express')

const controller = require('./checkout.controller')

const router = new Router()

router.post('/card-token', controller.createCardToken)
router.post('/create-customer', controller.createCustomer)
router.post('/payment', controller.payment)

module.exports = router
