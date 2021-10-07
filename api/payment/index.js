const { Router } = require('express')

const controller = require('./payment.controller')
const auth = require('./../../auth/auth.service')

const router = new Router()

router.post('/create-card', controller.createCard)
router.post('/customer', auth.isAuthenticated(), controller.createCustomer)
router.get('/customer/:id', controller.getCustomer)
router.post('/charge', auth.isAuthenticated(), controller.charge)
router.get('/charge/:id', controller.getCharge)
router.get('/totals', auth.isAuthenticated(), controller.getTotalPayments)
router.post('/bank', auth.isAuthenticated(), controller.bank)

module.exports = router
