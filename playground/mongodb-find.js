const { MongoClient } = require('mongodb');
const databaseUrl = 'mongodb://localhost:27017/TodoApp'

MongoClient.connect(databaseUrl,(error,client) => {
    const db = client.db('TodosApp')
    if(error){
        return console.log('MongoDB connection is failed')
    }
    console.log('MongoDB server is connected')

    const getMe = (name) => {
        db.collection('Users')
        .find({
            name: name
        })
        .toArray()
        .then(data => console.log(data))
    }
    // db.collection('Todos')
    //     .find()
    //     .toArray()
    //     .then(data => console.log(data));
    getMe('Thaumocracy');
    client.close();
})