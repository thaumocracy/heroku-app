const mongoose = require('mongoose')
const databaseUrl = process.send.MONGODB_URI || 'mongodb://localhost:27017/TodoApp'
mongoose.Promise = global.Promise

mongoose.connect(databaseUrl)



module.exports = {
    mongoose,
}