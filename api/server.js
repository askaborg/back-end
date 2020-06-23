const express = require("express")
const cors = require("cors")
const helmet = require("helmet")

const authenticate = require("../auth/generateToken")
const authRouter = require("../auth/auth-router")
const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())


//we will bring this in once the auth router is made
server.use("/api/auth", authRouter)

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" })
})

module.exports = server