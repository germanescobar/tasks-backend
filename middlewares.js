const User = require('./user');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const [, token] = req?.headers?.authorization?.split('Bearer ');
    const data = jwt.verify(token, process.env.SECRET_KEY || 'secret key'); // { userId: "12345"}

    const user = await User.findOne({ _id: mongoose.Types.ObjectId(data.userId) });
    if (user) {
      res.locals.user = user
      next();
    } else {
      res.status(401).json({ response: "not-authorized", message: 'No Authorized' });
    }
  } catch (err) {
    console.log("🚀 ~ file: middlewares.js ~ line 21 ~ auth ~ err", err)
    if (err.name === 'JsonWebTokenError') {
      res.status(401).json({ response: "invalid-token", message: 'Invalid Token' });
    } else if (err.name === 'TokenExpiredError') {
      res.status(401).json({ response: "token-expired", message: "Token Expired" });
    }
  }
};

module.exports = {
  auth,
};
