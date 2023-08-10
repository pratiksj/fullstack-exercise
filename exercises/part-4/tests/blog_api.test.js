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




afterAll(async () => {
    await mongoose.connection.close()
})