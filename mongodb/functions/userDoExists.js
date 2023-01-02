const user = require('./../schemas/user')

async function userDoExists(email){
    try{
        const result = await user.findOne({
            email
        })
        return result
    } catch (e){
        //to do: storage errors in db
        console.log(e.message)
    }
}

module.exports = userDoExists