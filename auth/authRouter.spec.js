
const request = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig.js")

describe("authRouter", () => {
  afterEach(async () => {
    await db("users").truncate()
  })
  describe("register", () => {
    test("register a user", async () => {
      const req = await request(server)
        .post("/api/auth/register")
        .send({
          username: "nouser",
          password: "nopassword"
        })
        .set("Accept", "application/json")
        .expect(201)
    })
  })
})