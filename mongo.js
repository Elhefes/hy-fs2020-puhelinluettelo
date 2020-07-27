const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.zjtrn.mongodb.net/persons?retryWrites=true&w=majority`

if (process.argv.length === 3) {
  console.log('phonebook:')
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const person = new Person({
  name: name,
  number: number
})

if (process.argv.length === 5) {
  person.save().then(response => {
    console.log(response)
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}