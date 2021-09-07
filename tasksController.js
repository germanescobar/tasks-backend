const store = require("./store");

const list = (req, res) => {
<<<<<<< HEAD
  res.json(store.list());
};

const create = (req, res) => {
  const task = store.create({ title: req.body.title });
  res.status(201).json(task);
};
=======
  store.list()
    .then(tasks => res.json(tasks))
}

const create = async (req, res, next) => {
  try {
    const task = await store.create({ title: req.body.title })
    res.status(201).json(task)
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(422).json(err.errors)
    } else {
      next(err)
    }
  }
}
>>>>>>> ec9a2118cab2c7cb60e0f181bf748372efeefff2

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
