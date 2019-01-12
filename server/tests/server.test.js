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
        text:'Two todo'
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

