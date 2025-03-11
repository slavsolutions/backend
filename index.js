require('dotenv').config();
const PORT = 9000;
const express = require('express');
const cors = require('cors');
const app = express();
const picDownloader = require('./backend/picDownloader');
const passport = require('passport');
const initializePassport = require("./backend/login/passport-config");
const passportJwt = require("./backend/login/passport-jwt");

// Importy routerów
const assetsRouter = require('./routes/assets');
const authRouter = require('./routes/auth');
const assetFieldsRouter = require('./routes/assetFields');
const assetTypesRouter = require('./routes/assetTypes');

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000','https://localhost:3000'],
    allowedHeaders: ['Content-Type','Authorization','X-Requested-With'],
    methods: ['GET','POST','OPTIONS']
}));
app.use(express.urlencoded({extended: false}));

const logger = (req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
};

app.use(logger);

// Podstawowe trasy
app.get('/cat', cors(), async(req,res) => {
    const pictureLink = 'https://cataas.com/cat';
    res.send(`<img src="${await picDownloader.picDownloader(pictureLink)}"/>`);
});

app.get('/dog', async(req,res) => {
    const raw = await axios.get('https://dog.ceo/api/breeds/image/random');
    const pictureLink = raw.data.message;
    res.send(`<img src="${await picDownloader.picDownloader(pictureLink)}"/>`);
});

app.get('/isserverup', async(req,res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.send('up');
});

// Połączenie z bazą danych
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/RISE");
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('Connected to socialFun database!'));

// Konfiguracja Passport
//passportJwt(passport);
//app.use(passport.initialize());
//initializePassport(
//    passport,
//    async function findUserInDb(email) {
//        try {
//            const data = await user.find({email});
//            return data;
//        } catch (e) {
//            console.log(e.message);
//        }
//    }
//);

// Użycie routerów
app.use(assetsRouter);
app.use(assetTypesRouter);
app.use('/auth', authRouter);
app.use(assetFieldsRouter);
//app.use('/assetTypes', assetTypesRouter);
//app.use('/getAssetTypes', assetTypesRouter);
app.listen(PORT, '127.0.0.1', () => console.log(`server running on port ${PORT}`));
