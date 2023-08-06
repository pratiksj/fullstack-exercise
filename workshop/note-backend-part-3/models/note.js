const mongoose = require('mongoose');

mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URL

console.log('connecting to the url')


mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })


const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 5,
        required: true
    },
    important: Boolean,
})

//const Note = mongoose.model('Note', noteSchema)
module.exports = mongoose.model('Note', noteSchema)