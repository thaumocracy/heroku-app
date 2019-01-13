const express = require('express')
const bodyParser = require('body-parser')
const { ObjectID } = require('mongodb')

const { mongoose } = require('./db/mongoose.js')
const { Todo } = require('./models/todo')
const { User } = require('./models/user')

const app = express()

const port = process.env.PORT || 3000

app.use(bodyParser.json())

app.post('/todos',(request,response) => {
    console.log(request.body)
    let todo = new Todo({
        text:request.body.text
    })
    todo.save().then(data => response.send(data),error => response.status(400).send(error))
})

app.delete('/todos/:id',(request,response) => {
    const id = request.params.id;
    if(ObjectID.isValid(id)){
        Todo.findByIdAndRemove(id).then((result) => {
            if(result){
                console.log(result);
                response.status(200).send(result)
            } else {
                response.status(404).send(`Unable to remove : id not found`)
            }
        })
    } else {
        response.status(404).send(`Unable to remove : id is NOT valid`)
    }
})

app.get('/todos',(request,response) => {
    console.log(request.body)
    Todo.find().then((todos) => {
        response.send({todos})
    }).catch(error => response.status(400).send(error))
})

app.get('/todos/:id',(request,response) => {
    const id = request.params.id;
    if(ObjectID.isValid(id)){
        Todo.findById(id).then((todo) => {
            if(!todo){
                response.status(404).send('Unable to get : no such ID')
            } else {
                response.send(todo)
            }
        }).catch((error) => {
            response.status(404).send('Unable to get : no such ID')
        })
    } else {
        response.status(404).send('Unable to get : invalid ID')
    }
})


app.listen(port,() => {
    console.log(`Server is started at port ${port}`)
})

module.exports = {
    app,
}