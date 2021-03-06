const expect = require('expect');
const request = require('supertest')
const { ObjectID } = require('mongodb')

const { app } = require('../server')
const { Todo } = require('../models/todo')

const todos = [
    {
        _id: new ObjectID(),
        text:'One todo'
    },
    {
        _id: new ObjectID(),
        text:'Two todo',
        completed:true,
        completedAt:8800
    },
]

beforeEach((done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos)
    }).then(() => done())
})

describe('POST /todos', () => {

    it('should create a new todo',(done) => {
        const text = 'TEST todo TEST'
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((response) => {
                expect(response.body.text).toBe(text)
            })
            .end((error,response) => {
                if(error){
                return done(error)
                }
                Todo.find({text:text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text)
                    done();
                }).catch((error) => {
                    console.log(error)
                })
            })
    })

    it('should return an error', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((error,response) => {
                if(error){
                    return done(error);
                } 
                
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2)
                    done();
                }).catch((error) => {
                    console.log(error)
                })
            })
    })

})

describe('GET /todos',() => {

    it('Should get all todos',(done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((response) => {
                expect(response.body.todos.length).toBe(2)
            })
            .end(done)
    })

})

describe('GET /todos:id',() => {

    it('Should return Todo item', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((response) => {
                expect(response.body.text).toBe(todos[0].text)
            })
            .end(done)
    })

    it('Should return 404 if todo is not found',(done) => {
        const hex = new ObjectID().toHexString()
        
        request(app)
            .get(`/todos/${hex}`)
            .expect(404)
            .end(done)
    })

    it('Should return 404 for non-object ids',(done) => {
        request(app)
            .get(`/todos/Fffffk`)
            .expect(404)
            .end(done)
    })
})

describe("DELETE /todos:id",() => {

    it('Should remove a todo', (done) => {
        const hexId = todos[0]._id.toHexString()

        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((response) => {
            console.log(response.body._id)
            expect(response.body._id).toBe(hexId);
        })
        .end((error,response) => {
            if(error){
                return console.log(response.body)
            } 
            Todo.findById(hexId).then((todo) => {
                expect(todo).toBeFalsy();
                done()
            }).catch(error => done(error))

        })
    })

    it('Should return 404 if todo is not found',(done) => {
        const hexId = new ObjectID().toHexString()
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(404)
        .end(done)
    })

    it('Should return 404 if ObjectID is invalid',(done) => {
        const hexId = 'GotBananas'
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(404)
        .end(done)
    })
})


describe('/PATCH /todos/:id',() => {

    it('Should update the todo',(done) => {
        const id = todos[0]._id.toHexString()
        request(app)
        .patch(`/todos/${id}`)
        .send({
            completed:true,
            text:'Test case one'
        })
        .expect(200)
        .expect((response) => {
            console.log(response.body.todo)
            expect(response.body.todo.completed).toBe(true);
        })
        .end(done)
    })

    it('Should clear completedAt if todo is not completed',(done) => {
        const id = todos[1]._id.toHexString()
        request(app)
        .patch(`/todos/${id}`)
        .expect(200)
        .expect((response) => {
            expect(response.completedAt).toBeFalsy()
        })
        .end(done)
    })
})