const userDoExists = require('../../mongodb/functions/userDoExists');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
require('dotenv').config();

function passportJwt(passport){
    passport.use(
        new JWTstrategy(
            {
              secretOrKey: process.env.ACCESS_TOKEN_SECRET,
              jwtFromRequest: ExtractJWT.fromBodyField('token')
            },        
            async (decodedEmailFromToken, done) => {
                const tokenData = await userDoExists(decodedEmailFromToken)
                if(decodedEmailFromToken === tokenData.email){
                  return done(null, tokenData)
                }
                else{
                  console.log('user not found in db')
                  return done(null, false)
                }
            }
        )
    );
}

module.exports = passportJwt