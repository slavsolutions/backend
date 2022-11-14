const axios = require('axios');
const {Buffer} = require('buffer');


const picDownloader = async (apiLink) =>{
    const apiPic = await axios.get(apiLink,{
        responseType: 'arrayBuffer',
        responseEncoding: 'binary'
    })
    let base64 = Buffer.from(apiPic.data, "binary").toString("base64");
    let image = `data:${apiPic.headers["content-type"]};base64,${base64}`;
    return image
}
module.exports = { picDownloader }