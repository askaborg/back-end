const request = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig.js")

describe("auth-router", () => {
  afterEach(async () => {
    await db("users")
  })

  describe("valid-register", () => {
    it("creates user", async () => {
      const randomUser = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      const req = await request(server)
        .post("/api/auth/register")
        .send({
          username: `${randomUser}`,
          password: "password"
        })
        .set("Accept", "application/json")
        .expect(201)
    })
  })

  describe("invalid-register", () => {
    it("requires username/password", async () => {
      const req = await request(server)
        .post("/api/auth/register")
        .send({
          username: "test-user"
        })
        .set("Accept", "application/json")
        .expect(406)
    })
  })
})