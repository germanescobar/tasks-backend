/**
 * @author: Cristian Moreno Zulauaga <cristian.moreno@makeitreal.camp>
 */

const jwt = require('jsonwebtoken')
const get = require('lodash/get')
const compose = require('composable-middleware')

const config = require('../config/environment')
const User = require('../api/user/user.model')

/**
 * Validate JWT
 * @param {String} token
 * @returns
 */
async function validateJwt(token) {
  try {
    const payload = await jwt.verify(token, config.secrets.session)
    return payload
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return compose().use(async (req, res, next) => {
    try {
      const authHeader = get(req, 'headers.authorization', null)
      if (authHeader) {
        const [, token] = authHeader.split(' ')

        // Validate token
        const payload = await validateJwt(token)

        // Attach user to request
        const user = await User.findById(payload._id).exec()

        if (!user) {
          return res.status(401).end()
        }

        req.user = user
        next()
        return null
      } else {
        return res.status(401).end()
      }
    } catch (error) {
      return next(error)
    }
  })
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set')
  }

  return compose()
    .use(isAuthenticated())
    .use((req, res, next) => {
      const {
        role
      } = req.user
      if (~config.userRoles.indexOf(role) && ~roleRequired.indexOf(role)) {
        next()
      } else {
        res.status(403).send('Forbidden')
      }
    })
}

/**
 * Returns a jwt token signed by the app secret
 * @param {String} id
 * @returns payload
 */
function signToken(id) {
  return jwt.sign({
    _id: id
  }, config.secrets.session, {
    expiresIn: 60 * 60 * 24,
  })
}

module.exports = {
  isAuthenticated,
  hasRole,
  signToken,
}
