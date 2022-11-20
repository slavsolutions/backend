const firebaseInit = require('./firebaseInit')
const { getAuth, onAuthStateChanged } = require('firebase/auth')
const { createUser, readUser } = require('./firebaseDatabase')



const auth = getAuth(firebaseInit)


//const persistence = async () => {
//    return (
//        auth.currentUser !== null ? {
//            email: auth.currentUser.email,
//            userName: await readUser(auth.currentUser.email)
//        } : { email: false}
//    )
//}


const persistence = async () => {
    const auth = getAuth()
    const user = auth.currentUser;
    if(user){
        return user
    }
    else{
        return (' ni ma')
    }
   
}



module.exports = {
    persistence
}