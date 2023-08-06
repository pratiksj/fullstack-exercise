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

notesRouter.get('/:id', (req, res, next) => {
    Note.findById(req.params.id).then((result) => {
        if (result) {
            res.json(result)
        } else {
            res.status(404).send(`There are no notes at${req.params.id}`)
        }
    }).catch((error) => {
        next(error)
    })


})

notesRouter.delete('/:id', (request, response, next) => {

    Note.findByIdAndDelete(request.params.id).then(() => {
        response.status(204).end()

    }).catch(error => next(error))
})

notesRouter.post('/', (request, response, next) => {
    const body = request.body
    const note = new Note({
        content: body.content,
        important: body.important || false,
    })
    note.save().then(savedNote => {
        response.json(savedNote)
    })
        .catch(error => next(error))

})


module.exports = notesRouter
