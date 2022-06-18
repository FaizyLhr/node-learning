const jwt = require('jsonwebtoken')
var username = 'usman'

//creating token
var token = jwt.sign({user: username}, 'shhhhh')
console.log('Token Created: ' + token)

function authToken(token){
    try{
        var decode = jwt.verify(token, 'shhhhh')
        console.log('logged in')
    }
    catch(e){
        console.log('not logged in')
    }
}
//decoding and auth user
authToken(token)


//modifying token and again decoding and auth user
token+='modify'
authToken(token)