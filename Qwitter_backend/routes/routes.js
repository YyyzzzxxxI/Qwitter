const router = require('express').Router()
const db = require("../db/db")

router.get('/', async (req, res) => {
    if (await db.isConnected())
        res.send("db is upp")
    else
        res.send("db is downn")
})

router.get('/db', async (req, res, next) => {
    res.send(await db.getAllUsers())
})

router.get('*', function(req, res, next){
    next(new Error("404"))
})


module.exports.router = router