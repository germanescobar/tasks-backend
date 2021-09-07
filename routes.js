const express = require("express");
const tasksController = require("./tasksController");
const { logger } = require("./middlewares");

const app = express.Router();

app.get("/tasks", logger, tasksController.list);
app.post("/tasks", tasksController.create);
app.delete("/tasks/:id", tasksController.destroy);
app.put("/tasks/:id", tasksController.update);

module.exports = app;
