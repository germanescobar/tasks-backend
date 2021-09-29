/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/users              ->  index
 * POST    /api/users              ->  create
 * GET     /api/users/:id          ->  show
 * PUT     /api/users/me           ->  update
 * DELETE  /api/users/:id          ->  destroy
 * @author: Cristian Moreno Zuluaga <khriztianmoreno@gmail.com>
 */
const crypto = require('crypto')

const User = require('./user.model')
const { signToken } = require('../../auth/auth.service')

const sendMail = require('../../utils/sendMail')

/**
 * Get list of users
 * restriction: 'admin'
 */
async function index(_, res) {
  try {
    const users = await User.find({}, '-password')
      .sort({
        createdAt: -1
      })
      .exec()

    res.status(200).json(users)
  } catch (error) {
    res.status(500).send(error)
  }
}

/**
 * Creates a new user
 */
async function create(req, res) {
  const newUser = new User(req.body)

  try {
    const hash = crypto.createHash('sha256').update(newUser.email).digest('hex')
    newUser.passwordResetToken = hash;
    newUser.passwordResetExpires = Date.now() + 86400000; // 24 hour

    const user = await newUser.save()
    // Virtual prop
    const profile = newUser.profile

    const token = signToken(user._id)

    await sendMail({
      to: newUser.email,
      subject: 'Welcome to the app',
      html: `
        <h1>Welcome to the app</h1>
        <p>Es un gusto tenerte en nuestra app, ${newUser.firstName} ${newUser.lastName}</p>
        <a href='http://localhost:3000/verified/${hash}'>Confirm your email</a>
      `
    })

    return res.status(201).json({
      profile,
      token
    })
  } catch (error) {
    console.log('🚀 ~ file: user.controller.js ~ line 61 ~ create ~ error', error)
    res.status(500).send(error)
  }
}

async function verified(req, res) {
  const { token } = req.params

  try {
    // const user = await User.findOne({token})
    // // token sea valido

    // const tokencito = signToken(user._id)

    return res.status(200).json({
      token: 'hola mama'
    })
  } catch (error) {
    res.status(500).send(error)
  }


}

/**
 * Get a single user
 */
async function show(req, res) {
  const {
    id: userId
  } = req.params

  try {
    const user = await User.findById(userId).exe()

    if (!user) {
      return res.status(404).end()
    }
    return res.json(user)
  } catch (error) {
    res.status(500).send(error)
  }
}

/**
 * Deletes a user
 * restriction: 'manager'
 */
async function destroy(req, res) {
  const {
    id: userId
  } = req.params

  try {
    await User.findByIdAndRemove(userId).exe()
    return res.status(204).end()
  } catch (error) {
    res.status(500).send(error)
  }
}

/**
 * Get my info
 */
async function me(req, res) {
  const {
    _id: userId
  } = req.user

  try {
    const user = await User.findOne({
      _id: userId
    }, '-password').exec()
    if (!user) {
      return res.status(401).end()
    }
    return res.json(user)
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = {
  create,
  destroy,
  index,
  me,
  show,
  verified,
}
