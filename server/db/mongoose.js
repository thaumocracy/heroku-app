const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');
mongoose.Promise = global.Promise

mongoose.connect(databaseUrl)



module.exports = {
    mongoose,
}