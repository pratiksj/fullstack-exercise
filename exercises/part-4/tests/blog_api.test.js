const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')



describe('testing api of blog application', () => {

    beforeEach(async () => {
        // await Blog.deleteMany({})
        // let blogObject = new Blog(initialBlogs[0])
        // await blogObject.save()
        // blogObject = new Blog(initialBlogs[1])
        // await blogObject.save()
        await Blog.deleteMany({})

        const blogsObjects = helper.initialBlogs
            .map(blog => new Blog(blog))
        const promiseArray = blogsObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
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


        const response = await helper.blogsInDb()
        //console.log(response, 'this')
        expect(response).toHaveLength(helper.initialBlogs.length + 1)
        const author = response.map((blog) => blog.author)
        //console.log(author, 'map')
        expect(author).toContain("Neha")




    })

    test('add 0 to the likes property incase of missing ', async () => {
        const newBlog = {
            title: 'silicon valley',
            author: 'Neha',
            url: 'oninekhbarrr',

        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)

        const response = await helper.blogsInDb()
        const addedLikes = response.map((data) => data.likes)



        expect(addedLikes).toContain(0)
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

        const notAddedBlog = await helper.blogsInDb()
        expect(notAddedBlog).toHaveLength(helper.initialBlogs.length)


    })

    //     test('missing titile getting 400 bad request as response', async () => {
    //         const newBlog = {
    //             url: 'www.kathmandupost',
    //             author: 'Neha',
    //             likes: 13

    //         }

    //         await api
    //             .post('/api/blogs')
    //             .send(newBlog)
    //             .expect(400)
    //     })

    test('deleting single blog', async () => {
        //const response = await api.get('/api/blogs');
        const response = await helper.blogsInDb()
        let deleteToBlog = response[0]
        //console.log(id, 'hey')

        await api.delete(`/api/blogs/${deleteToBlog.id}`).expect(204)
        const deletedBlog = await helper.blogsInDb()
        expect(deletedBlog).toHaveLength(helper.initialBlogs.length - 1)
        const author = deletedBlog.map((data) => data.author)
        expect(author).not.toContain(deleteToBlog.author)




    })



})

describe('testing for put api', () => {
    test.only('updating likes of the blog', async () => {
        //const response = await api.get('/api/blogs');
        const response = await helper.blogsInDb()

        const updatedBlog = {
            likes: 20,
        }

        const blogToUpdate = await api.put(`/api/blogs/${response[0].id}`).send(updatedBlog)
        //const changedBlog = await api.get('/api/blogs');
        const changedBlog = await helper.blogsInDb()

        //console.log(changedBlog.body[0], 'lahalla')
        expect(changedBlog[0].likes).toBe(21);



    })
})

afterAll(async () => {
    await mongoose.connection.close()
})

