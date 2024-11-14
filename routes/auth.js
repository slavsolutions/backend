// routes/auth.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userDoExists = require('../mongodb/functions/userDoExists');
const createUserInDb = require('../mongodb/functions/createUser');

router.post('/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    try {
        const isAlreadyRegistered = await userDoExists(req.body.email);
        if (isAlreadyRegistered == null) {
            await createUserInDb(req.body.name, req.body.email, hashedPassword);
            res.send({
                status: 'success',
                name: req.body.name,
                email: req.body.email,
                message: 'User ' + req.body.name + ' created successfully'
            });
        } else {
            res.send({
                status: 'failure',
                name: req.body.name,
                email: req.body.email,
                reason: 'User already exists.'
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({ status: 'error', message: e.message });
    }
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        try {
            if (err || !user) {
                res.send({status: 'failure', info});
            } else {
                const token = jwt.sign(info.message.email, process.env.ACCESS_TOKEN_SECRET);
                res.send({status: 'success', info, token});    
            }
        } catch(e) {
            console.log(e);
            res.status(500).send({ status: 'error', message: e.message });
        }
    })(req, res, next);
});

router.post('/pro', function(req, res, next) {
    passport.authenticate('jwt', { session: false },
    (err, user, info) => {
        res.send(user);
    })(req, res, next);
});

module.exports = router;
