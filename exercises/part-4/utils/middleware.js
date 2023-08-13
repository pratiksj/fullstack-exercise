const jwt = require('jsonwebtoken')



const tokenExtrator = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith("Bearer ")) {
        request.token = authorization.replace('Bearer ', '')
    }

    next()
}

const userExtrator = async (request, response, next) => {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    request.user = decodedToken

    next()
}

module.exports = {
    tokenExtrator,
    userExtrator
}