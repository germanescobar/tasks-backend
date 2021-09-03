const express = require('express')
const cors = require('cors')
const store = require('./store')
const routes = require('./routes')
const app = express()

// middlewares - chain of responsability
app.use(cors())
app.use(express.json()) // parsea el body a JSON

// rutas - endpoints - controladores
app.use(routes)

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({ error: err.message })
})

app.listen(3001, () => console.log("Servidor corriendo ..."))