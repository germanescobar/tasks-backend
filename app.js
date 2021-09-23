const express = require('express');
const http = require('http');

const connectDB = require('./database')
const expressConfig = require('./config/express')
const routesConfig = require('./routes')

connectDB()

// setup server
const app = express()
const server = http.createServer(app)

expressConfig(app)
routesConfig(app)

function startServer() {
  const PORT = process.env.PORT || 3001
  app.theTaskServerMake = server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT} ...`)
  })
}

setImmediate(startServer)

module.exports = app
