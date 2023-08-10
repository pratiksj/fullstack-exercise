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

    const blog = new Blog(request.body)

    // blog
    //     .save()
    //     .then(result => {
    //         response.status(201).json(result)
    //     })
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})


module.exports = blogRouter