const { SHA256 } = require('crypto-js')
const jwt = require('jsonwebtoken')


let data = {
    id:10
}

const token = jwt.sign(data,'12345random')

console.log(token);

const decoded = jwt.verify(token,'12345random')

console.log(decoded);
// let message = 'Here is some sha message'

// let hash = SHA256(message).toString();

// console.log(hash);

// const data = {
//     id : 3,
// }

// const token = {
//     data,
//     hash : SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// const resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString()

// if(resultHash === token.hash) {
//     console.log('Data was not manipulated')
// } else {
//     console.log('Data was manipulated,do not trust')
// }