const blogRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtrator, tokenExtrator } = require('../utils/middleware')
require('dotenv').config()





blogRouter.get('/', async (request, response) => {

    const blog = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blog)
})

blogRouter.post('/', userExtrator, async (request, response, next) => {
    try {

        const body = request.body


        const getUser = request.user

        const user = await User.findById(getUser.id)


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
    } catch (error) {
        next(error)
    }

})

blogRouter.delete('/:id', userExtrator, async (request, response, next) => {


    try {

        const user = request.user


        const blogId = await Blog.findById(request.params.id)
        if (!blogId) {
            return response.status(404).json({ message: 'this id does not exist' })
        }

        if (user.id.toString() === blogId.user.toString()) {
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).send({ message: 'Deleted sucessfully' })
        } else {
            response.status(401).json({ message: " you don't have permission to delete it" })
        }


    } catch (error) {
        next(error)
    }
})

blogRouter.put('/:id', userExtrator, async (request, response, next) => {
    try {
        const { title, author, url, likes } = request.body
        //const user = request.user


        const body = {
            title,
            author,
            url,
            likes: likes + 1
        }
        // if (user.id === blogId.user.toJSON()) {
        //     const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
        //     response.json(updatedBlog)
        // } this line of code prohibit logged in user to like someone else blog
        const blogId = await Blog.findById(request.params.id)
        if (!blogId) {
            response.status(404).json({ error: "this id doesn't exist" });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
        response.json(updatedBlog)



    } catch (exception) {
        next(exception)
    }




})


module.exports = blogRouter