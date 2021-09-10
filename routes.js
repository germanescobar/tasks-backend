const express = require('express');
var jwt = require('jsonwebtoken');
const tasksController = require('./tasksController');
const { auth } = require('./middlewares');
const User = require('./user');

const app = express.Router();

app.get('/tasks', auth, tasksController.list);
app.post('/tasks', tasksController.create);
app.delete('/tasks/:id', tasksController.destroy);

app.post('/login', async (req, res) => {
  // recibir credenciales (email y contraseña) y retornar un JWT
  const { email, password } = req.body;

  const user = await User.authenticate(email, password);
  if (user) {
    // retornamos el JWT
    const token = jwt.sign({ userId: user._id }, 'secret key');
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
});

module.exports = app;
