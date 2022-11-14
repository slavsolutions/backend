const firebase = require('firebase/app');
const firebaseConfig = require('./firebaseConfig')
const firebaseInit = firebase.initializeApp(firebaseConfig.firebaseConfig)

module.exports = firebaseInit;
