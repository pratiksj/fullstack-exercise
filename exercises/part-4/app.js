const config = require('./utils/config')
const express = require('express')
const app = express()

const blogRouter = require('./controllers/blog')
//const middleware = require('./utils/middleware')

const logger = require('./utils/logger')

app.use(express.static('build'))
app.use(express.json())
//app.use(middleware.requestLogger)
app.use('/api/blogs', blogRouter)
//app.use(middleware.unknownEndpoint)
//app.use(middleware.errorHandler)

module.exports = app