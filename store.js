let tasks = [];
let nextId = 0;
const mockStore = {
  list() {
    return tasks;
  },

  create(task) {
    task.id = nextId;
    if (!task.completed) {
      task.completed = false;
    }
    tasks = tasks.concat(task);
    nextId++;
    return task;
  },

  update(task) {
    tasks = tasks.map((t) => {
      return +task.id === t.id ? task : t;
    });
  },
  delete(id) {
    tasks = tasks.filter((task) => +id !== task.id);
  },
};

module.exports = mockStore;

