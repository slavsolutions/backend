require('dotenv').config();
const PORT = 9000;
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const { createClient } = require('pexels')
const client = createClient('563492ad6f917000010000018402214a7a694fe18255c1f984d0ccee');
const createUser = require('./backend/firebaseCreateUser');
const loginUser = require('./backend/firebaseLogin');
const logOutUser = require('./backend/firebaseLogOut');
const persistence = require('./backend/firebasePersistence');
const picDownloader =  require('./backend/picDownloader');
//const auth0Config =  require('./backend/auth0-login')
const { auth } = require('express-openid-connect');
const auth0Config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.ACCESS_TOKEN_SECRET,
    baseURL: 'http://localhost:9000',
    clientID: 'yXaUDltnI0duAYin15e2qi0XHiKfg1SN',
    issuerBaseURL: 'https://dev-w17xor5glatrv1zy.us.auth0.com'
    };
app.use(auth(auth0Config));
const { requiresAuth } = require('express-openid-connect');

const jwt = require('jsonwebtoken');
app.use(express.json());
app.use(cors());


app.get('/', async(req,res) =>{
    const pictureLink = 'https://cataas.com/cat';
    res.send(`<img src="${await picDownloader.picDownloader(pictureLink)}"/>`)
})

app.get('/dog', async(req,res) =>{
    const raw = await axios.get('https://dog.ceo/api/breeds/image/random');
    const pictureLink = raw.data.message
    res.send(`<img src="${await picDownloader.picDownloader(pictureLink)}"/>`)
})

app.post('/createuser',  async(req,res) =>{
    console.log(req.body.password, req.body.email)
    res.send(await createUser.createUser(req.body.email, req.body.password))
})

app.post('/loginuser',  async(req,res) =>{ 
    const user = req.body.email
    console.log(user)
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET )
    res.send(await loginUser.loginUser(req.body.email, req.body.password, accessToken))
})

app.get('/logout',  async(req,res) =>{
    res.send(await logOutUser.logOutUser(req.body.email, req.body.password))
})
app.get('/persistence',  async(req,res) =>{
    res.send(await persistence.persistence())
})

app.get('/authtoken', authenticateToken , (req,res) =>{
    res.status(200).send('zalogowano')
    console.log(req.user)
})
app.get('/auth0', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? res.redirect('/profile') : res.redirect('/login'));
});
app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user.email));
  });



function authenticateToken(req, res, next) {
    const authHeader = req.headers['auth']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }





//const pexel = () => app.get('/pexel', async(req,res) =>{
//    const random = (x) => Math.floor(Math.random()*x)
//    const query = 'palawan';
//    const ppp = client.photos.search({ query, per_page: 40 }).then(photos => {return photos.photos[random(photos.photos.length)].src.large});
//    res.send(`<img src="${await picDownloader(await ppp)}"/>`)
//    });
//const pexel = () => app.get('/pexel', async(req,res) =>{
//    const random = (x) => Math.floor(Math.random()*x)
//    const query = 'beach';
//    const ppp = client.photos.search({ query, page: 1, per_page: 80 }).then(photos => {return photos});
//    console.log(await JSON.stringify.ppp)
//    res.send(await ppp)
//    });

app.listen(PORT, 'localhost', ()=>console.log(`server running on port ${PORT}`))