const express = require("express")
const cors = require("cors")
const helmet = require("helmet")

const authenticate = require("../auth/authenticate-middleware")
const authRouter = require("../auth/auth-router")
const categoriesRouter = require("../categories/categories-router")
const tasksRouter = require("../tasks/tasks-router")
const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use("/api/auth", authRouter)
server.use("/api/category", authenticate, categoriesRouter)
server.use("/api/task", authenticate, tasksRouter)

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" })
})

module.exports = server