const firebaseInit = require('./firebaseInit')
const { getAuth, signOut } = require('firebase/auth')

const logOutUser = (y) => signOut(getAuth(firebaseInit))
.then((x) =>{
    console.log('firebase wylogowanie ', x, y)
    return x
})
.catch((error)=>{
    return(error.code)
})
module.exports = {
    logOutUser
}