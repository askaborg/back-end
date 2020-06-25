const router = require("express").Router()
const bc = require("bcryptjs")
const generateToken = require("./generateToken.js")
const Users = require("../users/user-model.js")

router.get("/", async (req, res) => {
  try {
    const userList = await Users.list()
    res.status(200).json({ userList })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post("/register", async (req, res) => {
  const { username, password } = req.body
  if (username && password) {
    try {
      const newUser = req.body
      const hash = bc.hashSync(newUser.password, 8)
      newUser.password = hash
      await Users.add(newUser)
      res.status(201).json({ message: "User created." })
    } catch (err) {
        res.status(500).json(err)
    }
  } else {
    res.status(406).json({ message: "You need a username and password. "})
  }
})

router.post("/login", async (req, res) => {
  const { username, password } = req.body
  if (username && password) {
    try {
      const user = await Users.findBy({ username }).first()
      if (user && bc.compareSync(password, user.password)) {
        const token = generateToken(user)
        res.status(200).json({ token: token })
      } else {
        res.status(401).json({ message: "Invalid login." })
      }
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.status(406).json({ message: "You need a username and password. "})
  }
})

module.exports = router