const MongoClient = require('mongodb').MongoClient;
const databaseUrl = 'mongodb://localhost:27017/TodoApp'

MongoClient.connect(databaseUrl, (error,client) => {
    if(error){
        return console.log('Unable to connect to MongoDB server')
    }
    const db = client.db('TodosApp')
    console.log('Mongo connected!')
    db.collection('Todos').insertOne({
        text:"Do some Node.js study",
        completed:false
    },(error,result) => {
        if(error) {
            return console.log('Unable to error Todo',error)
        }
        console.log(JSON.stringify(result.ops))
    })
    db.collection('Users').insertOne({
        name:'Thaumocracy',
        age:28,
        location:'Moscow'
    },(error,result) => {
        if(!error){
            console.log(JSON.stringify(result.ops))
        } else {
            console.log("Error connecting to database",error)
        }
    })
    client.close()
})