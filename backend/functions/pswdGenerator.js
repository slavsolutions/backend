require('dotenv').config();
const bcrypt = require('bcrypt');
const crypto = require('crypto')

const pswd = 'alamagownianiegokota'

const hashedPswd = () => crypto.createHmac('sha256', process.env.ACCESS_TOKEN_SECRET)

const pswdGenerator = async () =>{
    const a = await bcrypt.genSalt()
    const b = await bcrypt.hash(a, 10)
    const c = await bcrypt.hash('dupa', 10)
    console.log('x',c)
    console.log('aaa', pswd, hashedPswd())
}

module.exports = pswdGenerator