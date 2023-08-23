const config = require('./utils/config')
require('dotenv').config()
const express = require('express')
const app = express()

const blogRouter = require('./controllers/blog')
const middleware = require('./utils/middleware')
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')

const logger = require('./utils/logger')

app.use(express.static('build'))
app.use(express.json())
app.use(middleware.tokenExtrator)
//app.use(middleware.userExtrator)
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}
//app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app