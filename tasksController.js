const store = require('./store');
const Task = require('./task');

const list = async (req, res) => {
  const page = req.query.page || 1
  const count = await Task.count()
  const data = await Task.find({}, null, { skip: (page - 1) * 10, limit: 20 })

  res.json({
    count,
    page,
    data
  });
};

const create = async (req, res, next) => {
  try {
    const task = await store.create({ title: req.body.title });
    res.status(201).json(task);
  } catch (err) {
    console.log("🚀 ~ file: tasksController.js ~ line 22 ~ create ~ err", err)
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
