const {MongoClient , ObjectID} = require('mongodb')
const databaseUrl = 'mongodb://localhost:27017/TodoApp'

MongoClient.connect(databaseUrl,(error,client)=>{
    if(!error){
        const db = client.db('TodosApp')
        db.collection('Users').findOneAndUpdate({
            _id:new ObjectID('5c34b9f9ea87f318ac24683f')
        },{
            $set : {
                name:'New Name'
            }
        },{
            returnOriginal:false
        }
)
    } else {
        return console.log('Something broken');
    }
    client.close();
})