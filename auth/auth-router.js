const router = require("express").Router()
const bc = require("bcryptjs")
const generateToken = require("./generateToken.js")
const Users = require("../users/user-model.js")

router.post("/register", (req, res) => {
  const user = req.body
  const hash = bc.hashSync(req.body.password, 8)
  user.password = hash

  Users.add(user)
    .then(saved => {
      res.status(201).json({ message: "User created." })
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create user." })
    })
})

router.post("/login", (req, res) => {
  const { username, password } = req.body
  Users.findBy({ username })
      .first()
      .then(user => {
          if (user && bc.compareSync(password, user.password)) {
              const token = generateToken(user)
              res.status(200).json({ token: token })
          } else {
              res.status(401).json({ message: "Invalid login." })
          }
      })
      .catch(err => {
          res.status(500).json({ message: "Failed to log in." })
      })
})

module.exports = router