const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

//const url =`mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`
const url = `mongodb+srv://pratiksha:${password}@cluster0.cnk2vze.mongodb.net/newNoteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//     content: 'javascript is not easy at first',
//     important: true,
// })

Note.find({}).then(results => {
    results.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})


// note.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
// })