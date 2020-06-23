const jwt = require("jsonwebtoken")
const { jwtSecret } = require("../config/secrets.js")

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]

    if (token) {
      jwt.verify( token, jwtSecret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: "Unauthorized!" })
        } else {
          req.decodedJwt = decodedToken
          next()
        }
      })
    } else {
      throw new Error("Invalid token.")
    }
  } catch (err) {
    res.status(401).json({ error: "You don't have a bearer token!" })
  }
}