const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}


const password = process.argv[2]



const url =
    `mongodb+srv://pratiksha:${password}@cluster0.cnk2vze.mongodb.net/newContactList?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)


const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)



if (process.argv.length > 3) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    person.save().then(result => {
        console.log(`${result.name} and ${result.number} has added to the phonebook`)
        mongoose.connection.close()
    })
}



if (process.argv.length === 3) {
    Person.find({}).then(person => {
        console.log(person)
        console.log("person:")
        person.forEach(data => console.log(data.name, data.number))
        mongoose.connection.close()
    })
}


