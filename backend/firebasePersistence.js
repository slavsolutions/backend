const firebaseInit = require('./firebaseInit')
const { getAuth } = require('firebase/auth')
const { createUser, readUser } = require('./firebaseDatabase')



const auth = getAuth(firebaseInit)


const persistence = async () => {
    return (
        auth.currentUser !== null ? {
            email: auth.currentUser.email,
            userName: await readUser(auth.currentUser.email)
        } : { email: false}
    )
}

module.exports = {
    persistence
}