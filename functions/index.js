const functions = require("firebase-functions");
const express = require("express");
const app = express()

// my routings
//const dogRoute = require('./../backend/testdog')
//app.use('/dog', dogRoute)

app.get('/dog', async(req,res)=>{
    const raw = axios.get('https://dog.ceo/api/breeds/image/random');
    const pictureLink = raw.data.message
    res.send(`<img src="${await picDownloader.picDownloader(pictureLink)}"/>`)
})

app.get('/cat', (req, res)=>{
    res.send('cat')
})

exports.app = functions.https.onRequest(app)