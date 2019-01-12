const { mongoose } = require('../server/db/mongoose')
const { User } = require('../server/models/user')



const id = `5c386cd8b9f7002a3ce7ab17`

User.find({
    _id:id
}).then((users) => {
    console.log(users)
})

User.findOne({
    _id:id
}).then(user => console.log(user))

User.findById(id)
    .then((user) => {
        if(!user){
            console.log('User not found')
        } else {
            console.log(user)
        }
    }).catch(error => console.log('There was an error!',error))