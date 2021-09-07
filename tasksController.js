const store = require("./store");

const list = (req, res) => {
  res.json(store.list());
};

const create = (req, res) => {
  const task = store.create({ title: req.body.title });
  res.status(201).json(task);
};

const destroy = (req, res) => {
  store.delete(req.params.id);
  res.status(204).end();
};

const update = (req, res) => {
  store.update(req.body.data);
  res.status(204).end();
};

module.exports = {
  list,
  create,
  destroy,
  update,
};
