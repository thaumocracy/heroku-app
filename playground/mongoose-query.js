const { ObjectID } = require('mongodb')

const { mongoose } = require('../server/db/mongoose')
const { Todo } = require('../server/models/todo')


const id = `5c38e31d4d003006bca641fb`

if(!ObjectID.isValid(id)){
    console.log(`${id} is not valid ID`)
}
Todo.find({
    _id:id
}).then((todos) => {
    console.log(`Todos is ${todos}`)
})

Todo.findOne({
    _id:id
}).then((todo) => {
    console.log(`Todo is ${todo}`)
})

Todo.findById(id)
.then(todo => {
    if(!todo){
        console.log(`Id not found`)
    } else {
        console.log(`Todo is ${todo}`)
    }
}).catch((error) => {
    console.log("Oh my,happened",error)
})