const mongoose = require('mongoose');

const Task = require('./task')

const store = {
  async list() {
    return await Task.find()
  },

  async create(task) {
    return await Task.insertOne(task)
  },

  async update(task) {
    return await Task.updateOne({ _id: task.id }, { $set: { completed: task.completed } })
  },
  
  async delete(id) {
    return await Task.deleteOne({ _id: task.id })
  },
};

module.exports = store;

