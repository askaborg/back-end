const request = require("supertest")
const server = require("../api/server")

describe("tasks-router", () => {

    let token
    beforeAll((done) => {
        request(server)
            .post('/api/auth/login')
            .send({
                username: 'user1',
                password: 'password',
            })
            .end((err, res) => {
                token = res.body.token
                done()
            })
    })

    describe('POST /', () => {

        it('return 401 unauthorized', async () => {
            const randomTask = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
            const res = await request(server)
                .post('/api/task')
                .set('Accept', 'application/json')
                .send({
                    task: `${randomTask}`
                })
            expect(res.status).toBe(401)            
        })

        it('returns 200 OK', async () => {
            const randomTask = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
            const res = await request(server)
                .post('/api/task')
                .set('Accept', 'application/json')
                .set('authorization', `Bearer ${token}` )
                .send({
                    category: "cat1-user1",
                    task: `${randomTask}`
                })
            expect(res.status).toBe(200)            
        })
    })
})