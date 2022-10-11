require('dotenv').config();
const PORT = 9000;
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const { createClient } = require('pexels')
const client = createClient('563492ad6f917000010000018402214a7a694fe18255c1f984d0ccee');
const createUser = require('./backend/firebaseCreateUser')
const loginUser = require('./backend/firebaseLogin')
const logOutUser = require('./backend/firebaseLogOut')
const persistence = require('./backend/firebasePersistence')
const picDownloader =  require('./backend/picDownloader')
app.use(express.json());
app.use(cors())



const catPicsApi = () => app.get('/', async(req,res) =>{
    const pictureLink = 'https://cataas.com/cat';
    res.send(`<img src="${await picDownloader.picDownloader(pictureLink)}"/>`)
})

const dogPicsApi = () => app.get('/dog', async(req,res) =>{
    const raw = await axios.get('https://dog.ceo/api/breeds/image/random');
    const pictureLink = raw.data.message
    res.send(`<img src="${await picDownloader.picDownloader(pictureLink)}"/>`)
})


const ccreateUser = () => app.post('/createuser',  async(req,res) =>{
    console.log(req.body.password, req.body.email)
    res.send(await createUser.createUser(req.body.email, req.body.password))
})
const lloginUser = () => app.post('/loginuser',  async(req,res) =>{
    res.send(await loginUser.loginUser(req.body.email, req.body.password))
})
const llogOut = () => app.get('/logout',  async(req,res) =>{
    res.send(await logOutUser.logOutUser(req.body.email, req.body.password))
})
const hpersistence = () => app.get('/persistence',  async(req,res) =>{
    res.send(await persistence.persistence())
})

llogOut()
dogPicsApi()
catPicsApi()
ccreateUser()
lloginUser()
hpersistence()







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

app.listen(PORT, ()=>console.log(`server running on port ${PORT}`))