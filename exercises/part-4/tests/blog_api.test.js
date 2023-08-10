const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'HTML is easy',
        author: 'pratiksha',
        url: 'www.kathmandupostcom',
        likes: 12
    },
    {
        title: 'javascript is easy',
        author: 'usha',
        url: 'www.onlinekhabar.com',
        likes: 20
    },
]

describe('testing api of blog application', () => {

    beforeEach(async () => {
        await Blog.deleteMany({})
        let blogObject = new Blog(initialBlogs[0])
        await blogObject.save()
        blogObject = new Blog(initialBlogs[1])
        await blogObject.save()
    })

    test('blogs are returned as JSON', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('blogs id returned as json', async () => {
        const response = await api.get('/api/blogs');

        const blogs = response.body
        //console.log(blogs, 'she')
        blogs.forEach((blog) => {
            expect(blog.id).toBeDefined()
        })


    })

    test.only('a valid blog can be added', async () => {
        const newBlog = {
            title: 'async/await simplifies making async calls',
            author: 'Neha',
            url: 'www.kathmandupost.com',
            likes: 10
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')


        expect(response.body).toHaveLength(initialBlogs.length + 1)

    })


})











afterAll(async () => {
    await mongoose.connection.close()
})