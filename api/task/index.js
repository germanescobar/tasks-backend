const { Router } = require('express')

const controller = require('./tasks.controller')

const router = new Router()

// all verbs
// endpoints

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
router.get('/', controller.index)

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
router.post('/', controller.create)
router.delete('/:id', controller.destroy)
// router.put('/:id', controller.put)

module.exports = router
