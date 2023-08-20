const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')


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



    try {
        await Note.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
})

notesRouter.post('/', async (request, response, next) => {
    const body = request.body

    const user = await User.findById(body.userId)

    if (!body.content) {
        return response.status(400).send({ message: "content is missing" })
    }
    const note = new Note({
        content: body.content,
        important: body.important || false,
        user: user.id
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


module.exports = notesRouter
