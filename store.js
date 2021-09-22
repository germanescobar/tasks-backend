const mongoose = require('mongoose');

const Task = require('./task')

const store = {
  async list() {
    return await Task.find()
  },

  /**
   * Create a new task
   * @param {Object} task
   * @returns Promise
   */
  async create(task) {
    return await Task.create(task)
  },

  async update(task) {
    return await Task.updateOne({ _id: task.id }, { $set: { completed: task.completed } })
  },

  async delete(id) {
    return await Task.deleteOne({ _id: id })
  },
};

module.exports = store;

