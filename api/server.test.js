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
  test('returns a status 200 OK', async () => {
    const res = await request(server).post('/register').send({username: 'bob', password: '1234'})
    expect(res.status).toBe(201)
  })
})
describe('[POST] /login', () => {
  it('returns a status 201 CREATED', async () => {
    
  })
})



