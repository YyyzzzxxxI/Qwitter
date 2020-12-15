const bcrypt = require('bcrypt')
const config = require("../config/config")
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const db = require('../db/db')


//done(serverError, user, msg)
async function loginUser(username, password, done){
    const user = await db.findUserByUsername(username)
    if(!user)
        return done(null, false, {error: 'Incorrect username!'})
    try{
        if(await bcrypt.compare(password, user.password)){
            console.log("Logged in:\n", user.username)
            return done(null, user, {message: "Success!"})
        }
        else
            return done(null, false, {error: "Incorrect password!"})
    }
    catch(e){
        return done(e, false, {error: "Something wrong..."})
    }
}

async function registerUser(username, password, done){
    const user = await db.findUserByUsername(username)
    if(user)
        return done(null, false, {error: 'Username already exist!'})
    try{
        let validateMsg = db.validateUser(username, password)
        if(validateMsg){
            console.log(validateMsg)
            return done(null, false, {error: validateMsg})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        let info = await db.createUser(username, hashedPassword)
        if(info.error) return done(null, null, {error: info.error})
        return done(null, info.user, {message: info.message})
    }
    catch(e){
        console.log(e)
        return done(null, null, {error: "Something strange..."})
    }
}

const jwtOptions = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: function(req){
        let token = null;
        if(req && req.cookies) token = req.cookies['jwt'];
        return token;
    }
}

async function jwtFunc(payload, done){
    await db.findUserByUsername(payload.username)
            .then(user => {
                return done(null, user)
            })
            .catch(err => {
                return done(err)
            })

}

passport.use('jwt', new JwtStrategy(jwtOptions, jwtFunc));

passport.use('login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, loginUser))

passport.use('register', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, registerUser))

module.exports = passport