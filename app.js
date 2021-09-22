require('dotenv').config()
const bb = require('express-busboy');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const store = require('./store');
const routes = require('./routes');

const app = express();

bb.extend(app, {
  upload: true,
  path: 'uploads',
  allowedPath: /./
});

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "0.1.0",
      description: "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Cristian Moreno",
        url: "https://khriztianmoreno.dev",
        email: "cristian.moreno@makeitreal.camp",
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    servers: [{
      url: "http://localhost:3001",
      description: 'Development server',
    }],
  },
  apis: ["./routes.js"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions)

mongoose.connect(
  process.env.MONGO_URI, {
    useNewUrlParser: true
  }
);

mongoose.connection.on('error', function (e) {
  console.error(e);
});

// middlewares - chain of responsability
app.use(cors());
app.use(express.json()); // parsea el body a JSON

// rutas - endpoints - controladores
app.use(routes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// manejo global de errores
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    error: err.message
  });
});

module.exports = app
