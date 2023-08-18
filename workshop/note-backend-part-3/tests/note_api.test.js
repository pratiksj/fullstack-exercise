const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Note = require('../models/note')
const helper = require('./test_helper')


beforeEach(async () => {
    await Note.deleteMany({})
    const noteObject = helper.initialNotes.map(note => new Note(note))
    const promiseArray = noteObject.map(note => note.save())
    await Promise.all(promiseArray)
    // let noteObject = new Note(helper.initialNotes[0])
    // await noteObject.save()
    // noteObject = new Note(helper.initialNotes[1])
    // await noteObject.save()
})


test('notes are returned as json', async () => {
    const allNote = await helper.notesInDb()
    expect(allNote).toHaveLength(2)

})

test('a specific note is within the returned notes', async () => {
    const response = await helper.notesInDb()

    const contents = response.map(r => r.content)
    expect(contents).toContain(
        'Browser can execute only JavaScript'
    )
})

test('a valid note can be added', async () => {
    const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await helper.notesInDb()

    const contents = response.map(r => r.content)

    expect(response).toHaveLength(helper.initialNotes.length + 1)
    expect(contents).toContain(
        'async/await simplifies making async calls'
    )
})

test('note without content is not added', async () => {
    const newNote = {
        important: true
    }

    const responseFromServer = await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)


    const response = await helper.notesInDb()
    expect(response).toHaveLength(helper.initialNotes.length)
    expect(responseFromServer._body.message).toContain('content is missing')

})

test('a specific note can be viewed', async () => {
    const notesAtStart = await helper.notesInDb()


    const noteToView = notesAtStart[0]

    const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)



    expect(resultNote._body).toEqual(noteToView)
})

test('a note can be deleted', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToDelete = notesAtStart[0]
    console.log(noteToDelete, 'hellow')
    await api.delete(`/api/notes/${noteToDelete.id}`).expect(204)
    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1)
    const contents = notesAtEnd.map(r => r.content)
    expect(contents).not.toContain(noteToDelete.content)

})


afterAll(async () => {
    await mongoose.connection.close()
})