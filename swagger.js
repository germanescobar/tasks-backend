const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

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

module.exports = {
  server: swaggerUi.serve,
  setup: swaggerUi.setup(swaggerSpec)
}
