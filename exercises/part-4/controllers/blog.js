const blogRouter = require('express').Router()
const { response } = require('../app')
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

blogRouter.delete('/:id', async (request, response, next) => {

    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
})

blogRouter.put('/:id', async (request, response, next) => {
    try {
        const { title, author, url, likes } = request.body
        const body = {
            title,
            author,
            url,
            likes: likes + 1
        }
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
        response.json(updatedBlog)
    } catch (exception) {
        next(exception)
    }




})


module.exports = blogRouter