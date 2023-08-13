const blogRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')


blogRouter.get('/', async (request, response) => {

    const blog = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blog)
})

blogRouter.post('/', async (request, response) => {
    //const { title, author, url, likes } = request.body
    const body = request.body
    const user = await User.findById(body.userId)
    if (!body.likes) {
        body.likes = 0
    }

    if (!body.title || !body.url) {
        return response.status(400).json({ error: 'content missing' })
    }




    const blog = new Blog({ title: body.title, author: body.author, url: body.url, likes: body.likes, user: user.id })



    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
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