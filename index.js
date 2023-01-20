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
//BASIC ROUTES SECTION

app.get('/', async(req,res) =>{
    const pictureLink = 'https://cataas.com/cat';
    res.send(`<img src="${await picDownloader.picDownloader(pictureLink)}"/>`)
})
app.get('/dog', async(req,res) =>{
    const raw = await axios.get('https://dog.ceo/api/breeds/image/random');
    const pictureLink = raw.data.message
    res.send(`<img src="${await picDownloader.picDownloader(pictureLink)}"/>`)
})
app.get('/isserverup',  async(req,res) =>{
    res.send('up')
})
// END ROUTES SECTION

//DATABASE CONNECTION
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/socialFun")
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', ()=> console.log('connected to db'))
const user = require('./mongodb/schemas/user')
////END DATABASE CONNECTION

//LOGIN SECTION
const flash =  require('express-flash')
const session = require("express-session")
const passport = require('passport')
const initializePassport = require("./backend/login/passport-config")
const passportJwt = require("./backend/login/passport-jwt")
const bcrypt = require('bcrypt');


passportJwt(passport)

app.use(flash())
//app.use(session({
//    secret: process.env.ACCESS_TOKEN_SECRET,
//    resave: false,
//    saveUninitialized: false
//}))
app.use(passport.initialize())
//app.use(passport.session())

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
            status: 'Success, user '+req.body.name+' created!',
            name: req.body.name
        })) : res.send({
            status: 'failure',
            name: req.body.name,
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
            console.log('error', err)
        }
        console.log(info)
        const token = jwt.sign(info.message.email, process.env.ACCESS_TOKEN_SECRET)
        res.send({info, token});    
    } catch(e){
        console.log(e)
    }

})(req, res, next);
  });
// END LOGIN PART

app.post('/pro',function(req, res, next){
    passport.authenticate('jwt', { session: false},
    (err, user, info)=>{
        res.send(user)
    })(req, res, next)
})
//const { createClient } = require('pexels')
//const client = createClient('563492ad6f917000010000018402214a7a694fe18255c1f984d0ccee');

//app.post('/pro', passport.authenticate('jwt', { session: false},
//    (err, user, info)=>{
//        console.log('message from successful jwt auth,',user)
//    }),
//    function(req, res){
//        res.send('x')
//    }
//)
//function authenticateToken(req, res, next) {
//    //const authHeader = req.headers['auth']
//    //const token = authHeader && authHeader.split(' ')[1]
//    if (token == null) return res.sendStatus(401)
//  
//    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//      if (err) return res.sendStatus(403)
//      req.user = user
//      next()
//    })
// }
//const pexel = () => app.get('/pexel', async(req,res) =>{
//    const random = (x) => Math.floor(Math.random()*x)
//    const query = 'palawan';
//    const ppp = client.photos.search({ query, per_page: 40 }).then(photos => {
//    return photos.photos[random(photos.photos.length)].src.large});
//    res.send(`<img src="${await picDownloader(await ppp)}"/>`)
//    });
//const pexel = () => app.get('/pexel', async(req,res) =>{
//    const random = (x) => Math.floor(Math.random()*x)
//    const query = 'beach';
//    const ppp = client.photos.search({ query, page: 1, per_page: 80 }).then(photos => {return photos});
//    console.log(await JSON.stringify.ppp)
//    res.send(await ppp)
//    });

app.listen(PORT, '127.0.0.1', ()=>console.log(`server running on port ${PORT}`))
