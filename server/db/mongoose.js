const mongoose = require('mongoose')
const databaseUrl = 'mongodb://localhost:27017/TodoApp'
mongoose.Promise = global.Promise

mongoose.connect(databaseUrl)



module.exports = {
    mongoose,
}