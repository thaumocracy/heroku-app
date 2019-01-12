const { MongoClient} = require('mongodb')
const databaseUrl = 'mongodb://localhost:27017/TodoApp'
const Books = require('../test.json')

MongoClient.connect(databaseUrl,(error,client) => {

    if(!error){
        // ObjectId("5c3622be50e3b31ec4c3ff6c")
        // db.collection('Todos').insertMany(Books)
        const db = client.db('TodosApp');
        db.collection('Todos').deleteMany({
            finished:true
        })
    } else {
        return console.log('Something broken');
    }

    client.close();
})