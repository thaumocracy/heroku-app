const mongoose = require('mongoose')
const validator = require('validator')

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
        trim:true,
        minlength:4,
        unique:true,
        validate : {
            validator : validator.isEmail,
            message:" {VALUE} Email is not valid"
        },
    password: {
        type:String,
        required:true,
        minlength:6,
    },
    tokens : {
        access : {
            type:String,
            required:true,
        },
        token: {
            type:String,
            required:true,
        }
    }


    }
})

module.exports = {
    User,
}