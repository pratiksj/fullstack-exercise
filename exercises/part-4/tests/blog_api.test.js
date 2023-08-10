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

    test('a valid blog can be added', async () => {
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

    test('add 0 to the likes property incase of missing ', async () => {
        const newBlog = {
            title: 'silicon valley',
            author: 'Neha',
            url: 'oninekhbarrr',

        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)



        expect(response.body.likes).toBe(0)
    })


    test('missing url getting 400 bad request as response', async () => {
        const newBlog = {
            title: 'silicon valley',
            author: 'Neha',
            likes: 13

        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)




    })

    test('missing titile getting 400 bad request as response', async () => {
        const newBlog = {
            url: 'www.kathmandupost',
            author: 'Neha',
            likes: 13

        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

    test('deleting single blog', async () => {
        const response = await api.get('/api/blogs');
        let id = response.body[0].id
        //console.log(id, 'hey')

        await api.delete(`/api/blogs/${id}`).expect(204)



    })



})

describe('testing for put api', () => {
    test('updating likes of the blog', async () => {
        const response = await api.get('/api/blogs');
        console.log(response.body, 'put api')
        const updatedBlog = {
            likes: 20,
        }

        const blogToUpdate = await api.put(`/api/blogs/${response.body[0].id}`).send(updatedBlog)
        const changedBlog = await api.get('/api/blogs');
        //console.log(changedBlog.body[0], 'lahalla')
        expect(changedBlog.body[0].likes).toBe(21);



    })
})

afterAll(async () => {
    await mongoose.connection.close()
})

