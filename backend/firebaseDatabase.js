const firebaseInit = require('./firebaseInit')
const { getDatabase, ref, get, set, child} = require("firebase/database")
const db = getDatabase(firebaseInit)




const createUser = (userName, email) => set(ref(db, 'users/' + email.replace(/\./g, '%2E')),{
    userName,
})

const readUser = async (user) => {
    //const refx = ref(db, 'users/'+user.replace(/\./g, '%2E'));
    return await get(child(ref(db), 'users/'+(user.replace(/\./g, '%2E')))).then((snapshot) =>{
        if (snapshot.exists()) {
            console.log(snapshot.val());
            return snapshot.val().userName
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
    })

}




module.exports = {
    createUser, readUser
}