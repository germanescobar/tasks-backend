const User = require('./user');

const users = async (req, res) => {
  // var someModel = mongoose.model('user', user.userSchema);
  // someModel.collection().then((tasks) => res.json(tasks));
  const users = await User.findById('6137e1cf5b088290882af8ce');
  console.log(users);
  res.status(201).json(users);
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
  users,
  create,
  destroy,
};
