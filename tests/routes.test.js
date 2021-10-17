const request = require('supertest')
const app = require('../app')

describe('Get route', () => {
  it('page should return hello world', async (done) => {
    const res = await request(app).get('/')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual('Hello world')
    done()
  })
})

afterAll(async () => { await app.close() })
