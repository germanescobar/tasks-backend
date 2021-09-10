const User = require('./user');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    const data = jwt.verify(token, 'secret key'); // { userId: "12345"}

    const user = await User.findOne({ _id: mongoose.Types.ObjectId(data.userId) });
    if (user) {
      res.locals.user = user
      next();
    } else {
      res.status(403).json({ error: 'No Authorized' });
    }
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      res.status(401).json({ error: 'Invalid Token' });
      return;
    }
    next(err);
  }
};

module.exports = {
  auth,
};
