const express = require('express')
const cors = require('cors')
const store = require('./store')
const routes = require('./routes')
const mongoose = require('mongoose')
const app = express()

// middlewares - chain of responsability
app.use(cors())
app.use(express.json()) // parsea el body a JSON

mongoose.connect('mongodb://localhost:27017/topv10', { useNewUrlParser: true })

mongoose.connection.on('error', function (e) {
  console.error(e)
})

// rutas - endpoints - controladores
app.use(routes)

// manejo global de errores
app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({ error: err.message })
})

app.listen(3001, () => console.log('Servidor corriendo ...'))

// AJAX (Asynchronous JavaScript And XML) - llamados del cliente a servidor
// Google Maps
