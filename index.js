const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const store = require('./store');
const routes = require('./routes');
const app = express();
const User = require('./user');

mongoose.connect(
  'mongodb://127.0.0.1:27017/topv10',
  { useNewUrlParser: true }
);

mongoose.connection.on('error', function (e) {
  console.error(e);
});

// middlewares - chain of responsability
app.use(cors());
app.use(express.json()); // parsea el body a JSON

// rutas - endpoints - controladores
app.use(routes);

// manejo global de errores
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ error: err.message });
});

app.listen(3001, () => console.log('Servidor corriendo ...'));