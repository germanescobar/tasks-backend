const User = require('./user');
var jwt = require('jsonwebtoken');

const login = async (req, res) => {
  // recibir credenciales (email y contraseña) y retornar un JWT
  const { email, password } = req.body;

  const user = await User.authenticate(email, password);
  if (user) {
    // retornamos el JWT
    const token = jwt.sign({ 
      exp: Math.floor(Date.now() / 1000) + (15 * 24 * 60 * 60),
      userId: user._id 
    }, 'secret key');
    res.json({ token });
  } else {
    res.status(401).json({ error: "invalid-credentials", message: 'Credenciales inválidas' });
  }
}

const me = async (req, res) => {
  const { email, firstName, lastName } = res.locals.user
  res.json({ email, firstName, lastName })
}

module.exports = {
  login,
  me
}