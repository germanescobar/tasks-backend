/**
 * User
 * @author: Cristian Moreno Zuluaga <khriztianmoreno@gmail.com>
 */

const Router = require('express').Router

const controller = require('./user.controller')
const auth = require('./../../auth/auth.service')

const router = new Router()

router.get('/', auth.hasRole('admin'), controller.index)
router.delete('/:id', auth.hasRole('manager'), controller.destroy)
router.get('/me', auth.isAuthenticated(), controller.me)
router.get('/:id', auth.isAuthenticated(), controller.show)
router.post('/', controller.create)

module.exports = router
