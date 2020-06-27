const jwt = require("jsonwebtoken")
const { jwtSecret } = require("../config/secrets.js")

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    if (token) {
      jwt.verify( token, jwtSecret, (err, decodedToken) => {
        if (err) {
          res.status(401).json(err)
        } else {
          req.decodedJwt = decodedToken
          next()
        }
      })
    }
  } catch (err) {
    res.status(401).json(err)
  }
}