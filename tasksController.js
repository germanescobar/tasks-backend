const store = require('./store');

const list = (req, res) => {
  return res.json(store.list());
};

const create = async (req, res, next) => {
  try {
    const task = await store.create({ title: req.body.title });
    res.status(201).json(task);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(422).json(err.errors);
    } else {
      next(err);
    }
  }
};

const destroy = (req, res) => {
  store.delete(req.params.id);
  res.status(204).end();
};

module.exports = {
  list,
  create,
  destroy,
};
