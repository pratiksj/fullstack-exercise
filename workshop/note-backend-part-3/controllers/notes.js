const notesRouter = require('express').Router()
const Note = require('../models/note')


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

notesRouter.delete('/:id', (request, response, next) => {

    Note.findByIdAndDelete(request.params.id).then(() => {
        response.status(204).end()

    }).catch(error => next(error))
})

notesRouter.post('/', async (request, response, next) => {
    const body = request.body
    console.log(body, 'hehey')
    if (!body.content) {
        return response.status(400).send({ message: "content is missing" })
    }
    const note = new Note({
        content: body.content,
        important: body.important || false,
    })
    try {
        const savedNote = await note.save()
        response.status(201).json(savedNote)
    } catch (exception) {
        next(exception)
    }


})


module.exports = notesRouter
