// Write your tests here
const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')

describe('jokes authorization', () => {

  beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
  })

  afterAll(async () => {
    await db.destroy();
  })

  describe('[POST]  /register', () => {

    it('returns error if !username in body', async () => {

      const res = await request(server).post('/api/auth/register').send({ username: 'Homer' })

      expect(res.body).toMatchObject({ message: 'username and password required' })
    })

    it('adds new user to database', async () => {

      const res = await request(server).post('/api/auth/register').send({ username: 'Homer', password: 'Dufflover'})

      expect(res.body).toMatchObject({ id: 1, username: 'Homer', password: expect.any(String)})
    })
  })

  describe('[POST]  /login', () => {
    it('does not login if password does not match', async () => {
      const userLogin = await request(server).post('/api/auth/login').send({ username: 'Homer', password: 'mmmDonut'})
      
      expect(userLogin.body).toMatchObject({ message: 'invalid credentials' })
    
    })

    it('logs user in and sends back welcome message', async () => {

      const userLogin = await request(server).post('/api/auth/login').send({ username: 'Homer', password: 'Dufflover' })

      expect(userLogin.body).toHaveProperty('message', 'welcome, Homer')
    })

  })


})
