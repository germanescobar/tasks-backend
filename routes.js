const express = require('express');
const cloudinary = require('cloudinary').v2;
const tasksController = require('./tasksController');
const authController = require('./authController');
const { auth } = require('./middlewares');

const app = express.Router();

/**
 * @swagger
 * /test:
 *  get:
 *    description: ALGO MUY LARGO
 *    summary: Ruta de prueba
 *    responses:
 *      200:
 *        description: Exitosa respuesta
 *        content:
 *          application/json:
 *            schema:
 *              type: "object"
 *              properties:
 *                message:
 *                  type: string
 *                  description: Es un mensaje de verificacion
 *                  example: OK
 *      500:
 *        description: Server error
 */
app.get('/test', (req, res) => {
  res.json({ message: "ok" })
})


app.get('/tasks', auth, tasksController.list);

/***
 * @swagger
 * /tasks:
 *  post:
 *    summary: Create a new task
 *    security:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: "object"
 *            properties:
 *              title:
 *                type: string
 *                description: Name of task
 *                example: Generate documentation
 *              completed:
 *                type: bool
 *                description: Is completed t
 *                example: false
 *    responses:
 *      201:
 *        description: Created a new task
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                  example: Generate documentation
 *                _id:
 *                  type: string
 *                  example: 614a96635701df551c9d2623
 *                completed:
 *                  description: Is completed t
 *                  example: false
 *
 */
app.post('/tasks', tasksController.create);

app.delete('/tasks/:id', auth, tasksController.destroy);

app.post('/login', authController.login);
app.post('/register', authController.register);

/***
 * @swagger
 * /me:
 *  get:
 *    summary: Get personal info
 *    security:
 *      bearerAuth: []
 *    responses:
 *      20o:
 *        description: Personal Info
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                firstName:
 *                  type: string
 *                  example: Cristian
 *                lastName:
 *                  type: string
 *                  example: Moreno
 *                email:
 *                  type: string
 *                  example: cristian.moreno
 *
 */
app.get('/me', auth, authController.me);
app.post('/upload', (req, res, next) => {
  console.log("Files", req.files)

  cloudinary.uploader.upload(req.files.image.file, function(error, result) {
    if (error) {
      return next(error)
    }
    
    console.log(result, error)
    const url = result.url
  });
})

module.exports = app;
