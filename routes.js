const express = require('express');
const tasksController = require('./tasksController');
const authController = require('./authController');
const { auth } = require('./middlewares');

const app = express.Router();

app.get('/tasks', auth, tasksController.list);
app.post('/tasks', tasksController.create);
app.delete('/tasks/:id', tasksController.destroy);

app.post('/login', authController.login);
app.get('/me', auth, authController.me);

module.exports = app;
