/**
 * Auth Local passport configuration
 */

const {
  signToken
} = require('../../auth/auth.service')
const User = require('../../api/user/user.model')


async function login(req, res) {
  try {
    const {
      email,
      password
    } = req.body

    const user = await User.authenticate(email, password);
    if (!user) {
      return res.status(401).json({
        error: "invalid-credentials",
        message: 'Credenciales inválidas'
      });
    }

    const profile = user.profile
    const token = signToken(user._id)

    return res.status(200).json({
      profile,
      token
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

/**
 * Change a users password
 */
async function changePassword(req, res) {
  const userId = req.user._id
  const {
    oldPassword,
    newPassword
  } = req.body
}

module.exports = {
  login,
  changePassword,
}
