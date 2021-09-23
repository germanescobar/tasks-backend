/**
 * Main application routes
 */

// Import Endpoints
const helloworld = require('./api/helloworld')
const task = require('./api/task')
// const user = require('./api/user')

const swagger = require('./swagger')
const auth = require('./auth')

module.exports = app => {
  app.use('/api/helloworld', helloworld)
  app.use('/api/tasks', task)

  // auth [login, changePassword, forgor, recovery]
  app.use('/auth', auth)
  app.use('/docs', swagger.server, swagger.setup)
}
