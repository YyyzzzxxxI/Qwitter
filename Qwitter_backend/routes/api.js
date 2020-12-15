const router = require('express').Router()
const config = require("../config/config")
const jwt = require('jsonwebtoken')
const passport = require('../passport/config')
const qwitt = require("../qwitt/qwitt")

const multer = require("multer");
const path = require("path");
const upload = multer({
    dest: path.join("./tmp")
});

router.use(passport.initialize())

//protection
router.use(["/api/user"], (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, user) => {
        if(err || !user)
            res.status(401).send({error: "Deny"})
        else
            res.status(200).send({username: user.username})
    })(req, res)
})

router.post('/api/login', (req, res) => {
    if(!req.body.username || !req.body.password) res.send({error: "Fill all!"})
    passport.authenticate('login', {session: false}, async(err, user, info) => {
        if(info.error){
            res.json(info)
        }
        else{
            let token = await jwt.sign(
                {
                    username: user.username
                },
                config.jwtSecret,
                {expiresIn: config.jwtExpire}
            )
            res.cookie('jwt', token, {httpOnly: true})
            res.send({message: "Success!"})
        }
    })(req, res)
})

router.post('/api/register', (req, res) => {
    passport.authenticate('register', (err, user, info) => {
        res.json(info)
    })(req, res)
})

router.post('/api/isauth', (req, res) => {
    passport.authenticate('jwt', {session: false}, (err, user) => {
        if(err || !user)
            res.status(401).send({error: "Deny"})
        else
            res.status(200).send({message: "Allow"})
    })(req, res)
})

router.get('/api/logout', function(req, res){
    req.logout();
    res.cookie('jwt', {expires: Date.now()});
    res.status(200).send({message: "Logged out!"})
});

router.post("/api/createQwitt", upload.single("image"), async (req, res) => {
    await qwitt("createQwitt", req, res)
})

router.post('/api/getLikedQwitts', async (req, res) => {
   await qwitt("getLikedQwitts", req, res)
})

router.post('/api/getUserQwitts', async (req, res) => {
    await qwitt("getUserQwitts", req, res)
})

router.post('/api/likeQwitt', async (req, res) => {
    await qwitt("likeQwitt", req, res)
})

router.post('/api/unLikeQwitt', async (req, res) => {
    await qwitt("unLikeQwitt", req, res)
})

router.get("/images/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../qwitt/" + req.path));
});

module.exports.router = router