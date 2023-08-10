const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/', async (request, response) => {
    // Blog
    //     .find({})
    //     .then(blogs => {
    //         response.json(blogs)
    //     })
    const blog = await Blog.find({})
    response.json(blog)
})

blogRouter.post('/', async (request, response) => {
    //const { title, author, url, likes } = request.body
    const body = request.body
    if (!body.likes) {
        body.likes = 0
    }

    if (!body.title || !body.url) {
        return response.status(400).json({ error: 'content missing' })
    }




    const blog = new Blog(body)



    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})


module.exports = blogRouter