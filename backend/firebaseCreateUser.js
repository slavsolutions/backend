const firebaseInit = require('./firebaseInit')
const { getAuth, createUserWithEmailAndPassword} = require('firebase/auth')

const createUser = (email, password) => createUserWithEmailAndPassword(getAuth(firebaseInit), email, password)
.then((x) =>{return ('User created successfully')})
.catch((error)=>{
    return(error.code)
})
module.exports = {
    createUser
}