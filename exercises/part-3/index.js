const express = require("express");
const morgan = require("morgan");
const cors = require('cors')
const Person = require('./models/person')
const app = express();

app.use(express.static('build'))
app.use(express.json());
app.use(cors())


const customFormat = (tokens, req, res) => {
  let logData = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ]

  if (req.method === 'POST') {
    logData.push(JSON.stringify(req.body))
  }
  return logData.join(' ')
}
app.use(morgan(customFormat))






app.get("/api/persons", (request, response) => {

  Person.find({}).then(result => {
    response.json(result);

  })
});

app.get("/info", (request, response) => {
  response.send(
    `Phonebook has info for ${persons.length} people<p> ${new Date()}</p>`
  );
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })

});

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

app.get("/api/persons/:id", (request, response, next) => {
  //const id = Number(request.params.id);
  const person = Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
});

app.delete("/api/persons/:id", (request, response, next) => {
  // const id = Number(request.params.id);
  // persons = persons.filter((person) => person.id !== id);

  // response.status(204).end();
  Person.findByIdAndRemove(request.params.id).then(result => {
    response.status(204).end()
  }).catch(error => next(error))
});

app.put('/api/persons/:id', (request, response, next) => {

  Person.findByIdAndUpdate(request.params.id, { number: request.body.number }, { new: true }).then(updatedPerson => {
    response.json(updatedPerson)
  })
    .catch(error => next(error))



})
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


app.use(unknownEndpoint)



const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});