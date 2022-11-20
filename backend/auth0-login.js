require('dotenv').config();

const auth0Config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.ACCESS_TOKEN_SECRET,
  //secret: 'afsdfsfsdftyutyuytuytuytuytu',
  baseURL: 'http://localhost:9000',
  clientID: 'yXaUDltnI0duAYin15e2qi0XHiKfg1SN',
  issuerBaseURL: 'https://dev-w17xor5glatrv1zy.us.auth0.com'
  };


module.exports = {
  auth0Config
}
