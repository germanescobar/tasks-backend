const User = require('./user');
const jwt = require('jsonwebtoken');

const logger = (req, res, next) => {
  // autenticación, trazabilidad
  console.log('Llegó una nueva petición');
  next();
};
const auth = async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    const data = jwt.verify(token, 'secret key'); // { userId: "12345"}
    console.log('Data del token:', data);
    console.log('UserId: ', data.userId);

    const user = await User.findOne({ _id: data.userId });
    if (user) {
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
  logger,
  auth,
};
