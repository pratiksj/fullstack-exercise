const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


require('dotenv').config()


// notesRouter.get('/', (req, res) => {
//     res.send('<h1>hellow world</h1>')
// })

notesRouter.get('/', (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes)
    })

})

notesRouter.get('/:id', async (req, res, next) => {

    try {
        const singleNote = await Note.findById(req.params.id)
        if (singleNote) {
            res.status(200).json(singleNote)
        } else {
            res.status(400).end()
        }
    } catch (exception) {
        next(exception)
    }


})

notesRouter.delete('/:id', async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)

    const note = await Note.findById(request.params.id)


    try {
        if (user._id.toString() === note.user.toString()) {
            await Note.findByIdAndDelete(request.params.id)
            response.status(204).json({ message: 'Deleted successfully' })
        } else {
            response.status(401).json({ message: 'you do not have permission to delete this blog' })
        }


    } catch (exception) {
        next(exception)
    }
})

notesRouter.post('/', async (request, response, next) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)



    if (!body.content) {
        return response.status(400).send({ message: "content is missing" })
    }
    const note = new Note({
        content: body.content,
        important: body.important || false,
        user: user._id
    })
    try {

        const savedNote = await note.save()

        user.notes = user.notes.concat(savedNote._id)
        await user.save()
        response.status(201).json(savedNote)
    } catch (exception) {
        next(exception)
    }


})

notesRouter.put('/:id', async (request, response, next) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        const user = await User.findById(decodedToken.id)
        if (!user) {
            response.status(404).json({ error: 'this id does not exist' })
        }
        const updatedContent = await Note.findByIdAndUpdate(request.params.id, request.body, { new: true })
        response.json(updatedContent)
    } catch (exception) {
        next(exception)
    }

})


module.exports = notesRouter
