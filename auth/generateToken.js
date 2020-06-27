const jwt = require("jsonwebtoken")
const { jwtSecret } = require("../config/secrets.js")

function generateToken(user) {
    const payload = {
        id: user.id,
        username: user.username
    }
    const secret = jwtSecret
    const options = { expiresIn: "2h" }

    return jwt.sign(payload, secret, options)
}

module.exports = generateToken