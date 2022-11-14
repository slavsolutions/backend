const firebaseInit = require('./firebaseInit')
const { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } = require('firebase/auth')

const loginUser = (email, password, accessToken) => signInWithEmailAndPassword(getAuth(firebaseInit), email, password)
.then((x) =>{
    //console.log('firebase logowanie ', x)
    setPersistence(getAuth(firebaseInit), browserLocalPersistence);
    return {
        x,
        jwt: accessToken
    }
})
.catch((error)=>{
    return(error.code)
})
module.exports = {
    loginUser
}