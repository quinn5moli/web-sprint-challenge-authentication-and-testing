const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../secrets')

const buildToken = (user) => {

    const payload = {
        sub: user.id,
        username: user.username,
    }
}

const options = {
    expiresIn: '1d'
}

return jwt.sign(pauload, JWT_SECRET, options)

module.exports = buildToken