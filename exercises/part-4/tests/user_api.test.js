const bcrypt = require('bcryptjs')
const User = require('../models/user')
const helper = require('../tests/test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('missing username or password resulting 400 status code', async () => {
        const usersAtStart = await helper.usersInDb()

        // const newUser = {
        //     name: 'alka',
        //     password: '1234',
        // }
        const newUser = {
            username: 'alka',
            name: 'alka',

        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)



        const usersAtEnd = await helper.usersInDb()
        expect(usersAtStart).toHaveLength(usersAtEnd.length)


    })

    test('creating fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'root',
            password: 'hellow',
        }


        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username must be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)


    })

    test('creating fails with proper statuscode and message if username and password is less than 3', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'si',
            name: 'sita',
            password: 'hellow',
        }


        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Both username and password must contain atleat 3 charactors')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)


    })
})