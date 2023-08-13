const jwt = require('jsonwebtoken')



const tokenExtrator = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith("Bearer ")) {
        request.token = authorization.replace('Bearer ', '')
    }

    next()
}

module.exports = {
    tokenExtrator
}