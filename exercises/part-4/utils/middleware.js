const jwt = require('jsonwebtoken')


const errorHandler = (error, request, response, next) => {
    //console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token'
        })

    }

    next(error)
}


const tokenExtrator = (request, response, next) => {
    const authorization = request.get('authorization')



    if (authorization && authorization.startsWith("Bearer ")) {
        request.token = authorization.replace('Bearer ', '')
    }

    next()
}

const userExtrator = async (request, response, next) => {

    if (!request.token) {
        return response.status(401).json({ error: 'token is not provided' })
    }


    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    request.user = decodedToken
    next()
}








module.exports = {
    tokenExtrator,
    userExtrator,
    errorHandler
}