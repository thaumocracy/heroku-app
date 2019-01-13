const { ObjectID } = require('mongodb')

const { mongoose } = require('../server/db/mongoose')
const { Todo } = require('../server/models/todo')


const id = `5c38e31d4d003006bca641fb`

// Todo.remove({}).then((result) => {
//     console.log(result);
// })

Todo.findByIdAndRemove('5c3b1efc1ed22af2c8295d03').then(result => console.log(result))