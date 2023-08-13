const blogRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const getTokenFrom = request => {
    const authorization = request.get('authorization')
    console.log(authorization, 'from getTokenfrom')
    if (authorization && authorization.startsWith("Bearer ")) {
        return authorization.replace('Bearer ', '')
    }
    return null
}



blogRouter.get('/', async (request, response) => {

    const blog = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blog)
})

blogRouter.post('/', async (request, response) => {
    //const { title, author, url, likes } = request.body
    const body = request.body
    console.log(request, 'checking for token')
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    console.log(decodedToken, 'i am token')
    //const user = await User.findById(body.userId)
    const user = await User.findById(decodedToken.id)
    if (!body.likes) {
        body.likes = 0
    }

    if (!body.title || !body.url) {
        return response.status(400).json({ error: 'content missing' })
    }




    const blog = new Blog({ title: body.title, author: body.author, url: body.url, likes: body.likes, user: user._id })



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