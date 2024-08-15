require('dotenv').config();
const PORT = 9000;
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const picDownloader =  require('./backend/picDownloader');
const jwt = require('jsonwebtoken');
const userDoExists = require('./mongodb/functions/userDoExists')
const createUserInDb = require('./mongodb/functions/createUser')
app.use(express.json());
app.use(cors({
	credentials: true,
	origin: 'http://localhost:3100',
	headers: 'Content-Type,Accept,Authorization,X-Requested-With,X-HTTP-Method-Override',
	methods: 'OPTIONS,POST'
}));
app.use(express.urlencoded({extended: false}))


const logger = (req, res, next) => {
	console.log(`[${req.method}] ${req.url}`);
	next();
};

//BASIC ROUTES SECTION

app.get('/', cors(), async(req,res) =>{
    const pictureLink = 'https://cataas.com/cat?position=center&html=false&json=false';
    res.send(`<img src="${await picDownloader.picDownloader(pictureLink)}"/>`)
})
app.get('/dog', async(req,res) =>{
    const raw = await axios.get('https://dog.ceo/api/breeds/image/random');
    const pictureLink = raw.data.message
    res.send(`<img src="${await picDownloader.picDownloader(pictureLink)}"/>`)
})
app.get('/isserverup',  async(req,res) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.send('up')
})
// END BASIC ROUTES SECTION

//DATABASE CONNECTION
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/socialFun")
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', ()=> console.log('  Connected to socialFun database!'))
const user = require('./mongodb/schemas/user')
////END DATABASE CONNECTION

//LOGIN SECTION
const passport = require('passport')
const initializePassport = require("./backend/login/passport-config")
const passportJwt = require("./backend/login/passport-jwt")
const bcrypt = require('bcrypt');
passportJwt(passport)
app.use(passport.initialize())
initializePassport(
    passport,
    async function findUserInDb(email){
        try{
            const data = await user.find({email})
            return data
        } catch (e){
            console.log(e.message)
        }
    })

app.post('/register', async (req, res)=>{
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    try{
        const isAlreadyRegistered = await userDoExists(req.body.email)
        isAlreadyRegistered == null ?  (createUserInDb(req.body.name, req.body.email, hashedPassword), res.send({
            status: 'success',
            name: req.body.name,
            email: req.body.email,
            message: 'User '+req.body.name+' created successfully'
        })) : res.send({
            status: 'failure',
            name: req.body.name,
            email: req.body.email,
            reason: 'User already exists.'
        })
    } catch (e){
        console.log(e)
    }
})

app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
    try{
        if(err || !user){
            res.send({status: 'failure', info})
        }
        else{
            const token = jwt.sign(info.message.email, process.env.ACCESS_TOKEN_SECRET)
            res.send({status: 'success',info, token});    
        }
    } catch(e){
        console.log(e)
    }

})(req, res, next);
  });

  app.post('/pro',function(req, res, next){
    passport.authenticate('jwt', { session: false},
    (err, user, info)=>{
        res.send(user)
    })(req, res, next)
})
// END LOGIN PART
//const pswdGenerator = require('./backend/functions/pswdGenerator');
//pswdGenerator('x')


app.listen(PORT, '127.0.0.1', ()=>console.log(`server running on port ${PORT}`))
