const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {

    await Blog.deleteMany({})

    const blogsObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogsObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})


describe('testing api of blog application', () => {
    let token
    beforeEach(async () => {
        const newUser = {
            username: "usha",
            name: "usha",
            password: "usha",
        };
        await api.post("/api/users").send(newUser);

        const result = await api.post("/api/login").send(newUser);

        token = {
            Authorization: `Bearer ${result.body.token}`,
        };

    });


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
            .set(token)
            .expect(201)
            .expect('Content-Type', /application\/json/)


        const response = await helper.blogsInDb()

        expect(response).toHaveLength(helper.initialBlogs.length + 1)
        const author = response.map((blog) => blog.title)

        expect(author).toContain("async/await simplifies making async calls")




    })

    test('throwing status code if token is not given', async () => {
        const newBlog = {
            title: 'snake is dangerous',
            author: 'Neha',
            url: 'www.kathmandupost.com',
            likes: 10
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `Bearer`)
            .expect(401)
            .expect('Content-Type', /application\/json/)




    }, 100000)

    test('add 0 to the likes property incase of missing ', async () => {
        const newBlog = {
            title: 'silicon valley',
            author: 'Neha',
            url: 'oninekhbarrr',

        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set(token)
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
            .set(token)
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
            .set(token)
            .expect(400)
    })

    test('deleting single blog', async () => {



        const newBlog = {
            title: 'hellow',
            author: 'Neha',
            url: 'www.kathmandupost.com',
            likes: 10
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set(token)


        const response = await helper.blogsInDb()


        let deleteToBlog = response[2]


        await api.delete(`/api/blogs/${deleteToBlog.id}`).set(token).expect(204)
        const deletedBlog = await helper.blogsInDb()

        expect(deletedBlog).toHaveLength(deletedBlog.length)
        const author = deletedBlog.map((data) => data.author)
        expect(author).not.toContain(deleteToBlog.author)


    })
    test('updating likes of the blog', async () => {

        const newBlog = {
            title: 'Dhangadi',
            author: 'saru',
            url: 'www.kathmandupost.com'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set(token)
        const response = await helper.blogsInDb()


        const updatedBlog = {
            likes: 0,
        }

        await api.put(`/api/blogs/${response[2].id}`).send(updatedBlog).set(token)

        const changedBlog = await helper.blogsInDb()

        expect(changedBlog[2].likes).toBe(1);
    })
})


afterAll(async () => {
    await mongoose.connection.close()
})

