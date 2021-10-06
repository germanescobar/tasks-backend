/**
 * Main application routes
 */

// Import Endpoints
const helloworld = require('./api/helloworld')
const task = require('./api/task')
const user = require('./api/user')
const checkout = require('./api/checkout')

const swagger = require('./swagger')
const auth = require('./auth')

module.exports = app => {
  app.use('/api/helloworld', helloworld)
  app.use('/api/tasks', task)
  app.use('/api/users', user)
  app.use('/api/checkout', checkout)

  // auth [login, changePassword, forgor, recovery]
  app.use('/auth', auth)
  app.use('/docs', swagger.server, swagger.setup)
}
