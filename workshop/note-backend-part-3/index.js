const express = require("express");
const cors = require('cors')
require('dotenv').config()
const Note = require('./models/note')
const app = express();


app.use(express.static('build'))

app.use(express.json());


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}






app.get("/", (req, res) => {
  res.send("<h1>hellow world</h1>");
});

app.get("/api/notes", (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes)
  })

});

app.get("/api/notes/:id", (req, res, next) => {
  Note.findById(req.params.id).then((result) => {
    if (result) {
      res.json(result)
    } else {
      res.status(404).send(`There are no notes at${req.params.id}`)
    }
  }).catch((error) => {
    next(error)
  })


});

app.delete("/api/notes/:id", (request, response, next) => {

  Note.findByIdAndDelete(request.params.id).then((result) => {
    response.status(204).end()

  }).catch(error => next(error))
});

app.post("/api/notes", (request, response, next) => {
  const body = request.body;
  const note = new Note({
    content: body.content,
    important: body.important || false,
  })
  note.save().then(savedNote => {
    response.json(savedNote)
  })
    .catch(error => next(error))

});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on the port${PORT}`);
}); 