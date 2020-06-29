 const request = require("supertest")
const db = require("../database/dbConfig.js")

const server = require("./server.js");

describe("server.js", () => {
  test(" api: up" , async () => {
    const res = await request(server).get("/")
    expect(res.body).toEqual({ api: "up" })
  })
})