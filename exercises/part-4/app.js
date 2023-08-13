const config = require('./utils/config')
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
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
//app.use(middleware.unknownEndpoint)
//app.use(middleware.errorHandler)

module.exports = app