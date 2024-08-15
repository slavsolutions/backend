const axios = require('axios');
const {Buffer} = require('buffer');


const picDownloader = async (apiLink) =>{
    try{
        const apiPic = await axios.get(apiLink,{
            headers: {
                'Accept': 'image/*'
            },
            responseType: 'arrayBuffer',
            responseEncoding: 'binary'

        })
        console.log(apiPic.data)
        console.log(apiPic)
        //console.log(apiPic.data)
        //console.log(apiPic.data)
        let base64 = Buffer.from(apiPic.data, "binary").toString("base64");
        let image = `data:${apiPic.headers["content-type"]};base64,${base64}`;
        return image
    } catch(e) {
        console.log(e.data)
    }
}
module.exports = { picDownloader }