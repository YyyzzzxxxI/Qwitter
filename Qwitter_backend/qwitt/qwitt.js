const path = require("path");
const fs = require("fs");
const db = require("../db/db")

const handleError = (err, res) => {
    console.log(err.message)
    res.status(500).send({error: "Oops! Something went wrong!"});
}

async function createQwitt(req, res){
    try{
        let img = ""
        if(req.file){
            const tempPath = req.file.path;
            img = req.file.filename + ".png"
            const targetPath = path.join(__dirname, "./images/" + img);
            fs.rename(tempPath, targetPath, err => {
                if(err) return handleError(err, res);
            })
        }
        if(!req.body.quote || !req.body.author){
            res.send({error: "Введите цитату и автора!"})
            return
        }

        let data = req.body
        let qwitt = await db.createQwitt(data.username, data.quote, data.author, img)
        res .status(200).send({message: "Qwitt posted!", qwitt_id: qwitt.id})
    }
    catch(e){
        handleError(e, res)
    }
}

async function getLikedQwitts(req, res){
    try{
        let qwitts = await db.getLikedQwitts(req.body.username)

        res.status(200).send(qwitts)
    }
    catch(e){
        handleError(e, res)
    }
}

async function getUserQwitts(req, res){
    try{
        let qwitts = await db.getUserQwitts(req.body.username)

        res.status(200).send(qwitts)
    }
    catch(e){
        handleError(e, res)
    }
}

async function likeQwitt(req, res){
    try{
        let user_id = await db.getUserId(req.body.username)
        let qwitt_id = req.body.qwitt_id
        await db.likeQwitt(user_id, qwitt_id)

        res.status(200).send({message: "Liked success!"})
    }
    catch(e){
        handleError(e, res)
    }
}

async function unLikeQwitt(req, res){
    try{
        let user_id = await db.getUserId(req.body.username)
        let qwitt_id = req.body.qwitt_id
        await db.unLikeQwitt(user_id, qwitt_id)

        res.status(200).send({message: "Unliked success!"})

    }
    catch(e){
        handleError(e, res)
    }
}

module.exports = async function Qwitt(mode, req, res){
    switch(mode){
        case "createQwitt":{
            await createQwitt(req, res)
            break
        }
        case "getLikedQwitts":{
            await getLikedQwitts(req, res)
            break
        }
        case "getUserQwitts":{
            await getUserQwitts(req, res)
            break
        }
        case "likeQwitt":{
            await likeQwitt(req, res)
            break
        }
        case "unLikeQwitt":{
            await unLikeQwitt(req, res)
            break
        }
    }
}