const functions = require("firebase-functions");
const express = require("express");
const app = express()
const axios = require('axios');
const cors = require('cors')({ origin: true });



// my routings
app.use(cors())
app.get('*/dog', async (req,res)=>{
   
        console.log('xx')
        const dupa = await axios.get('https://dog.ceo/api/breeds/image/random')
        res.send(dupa)
        
       // .then(res => {
       //     const pictureLink = res.data.message
       //     return res.status(200).json({
       //         message: pictureLink
       //     })
       // })
        //.catch(err =>{
        //    return res.status(500).json({
        //        error: err
        //    })
        //    })
    //})
})

app.get('/cat', (req, res)=>{
    res.send('cat')
})

exports.app = functions.https.onRequest(app)