const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');


beforeEach(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
afterAll(async () => {
  await db.destroy()
})

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

describe('[POST] /register', () => {
  test('returns a status 201', async () => {
    const res = await request(server).post('/api/auth/register').send({username: 'bob', password: '1234'})
    expect(res.status).toBe(201)
  })
  test('returns correct error message if password is missing', async () => {
    const res = await request(server).post('/api/auth/register').send({username: 'bob'})
    expect(res.status).toBe(400)
  })
})
describe('[POST] /login', () => {
  test('returns a status 200 OK', async () => {
    await request(server).post('/api/auth/register').send({username: 'bob', password: '1234'})
    const res = await request(server).post('/api/auth/login').send({username: 'bob', password: '1234'})
    expect(res.status).toBe(200)
  })
  test('returns a status 200 OK', async () => {
    await request(server).post('/api/auth/register').send({username: 'bob', password: '1234'})
    const res = await request(server).post('/api/auth/login').send({username: 'bob', password: '12345'})
    expect(res.status).toBe(401)
  })
})



