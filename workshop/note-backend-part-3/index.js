const express = require("express");
const cors = require('cors')
require('dotenv').config()
const Note = require('./models/note')
const app = express();

// const mongoose = require('mongoose');

// const url = process.env.MONGODB_URL

// console.log('connecting to the url')
// mongoose.set('strictQuery', false)
// mongoose.connect(url)

// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// })

// const Note = mongoose.model('Note', noteSchema)

//app.use(cors())
app.use(express.static('build'))

app.use(express.json());


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}




let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

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

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);

  notes = notes.filter((note) => note.id !== id);
  console.log(notes, "from code");

  response.status(204).end();
});

app.post("/api/notes", (request, response) => {
  const body = request.body;
  const note = new Note({
    content: body.content,
    important: body.important || false,
  })
  note.save().then(savedNote => {
    response.json(savedNote)
  })
  // note.id = notes.length + 1;
  // notes.push(note);
  // response.status(201).json(note);
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