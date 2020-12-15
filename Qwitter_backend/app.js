const PORT = process.env.port || 5000
const express = require('express')
const cookieParser = require('cookie-parser')
const router = require("./routes/routes").router
const apiRouter = require("./routes/api").router

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())

app.use(apiRouter)
app.use(router)

app.listen(PORT)