const mongoose = require('mongoose')

const User = mongoose.model('User',{
    name: {
        type:String,
        required:true,
        minlength:2,
        trim:true,
    },
    email: {
        type:String,
        required:true,
        minlength:4,
        trim:true,
    }
})

module.exports = {
    User,
}