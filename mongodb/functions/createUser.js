const user = require('./../schemas/user')


async function createUser(name, email, password){
    try{
        const newUser = await user.create({
            name,
            email,
            password,
        })
        newUser.save()
    } catch (e){
        //save errors to db
        console.log(e.message)
    } 
}

module.exports = createUser