import express from "express"
import "dotenv/config"
const app = express()
const {PORT} = process.env

import path from "path"
app.use(express.static(path.resolve("../frontend/obsidian-mindbench/dist")))

app.use(express.json({limit: "10mb"}))
app.use(express.urlencoded({extended: true, limit: "10mb", parameterLimit: 50000}))

import cookieParser from "cookie-parser"
app.use(cookieParser())

import madbConnection from "./data/database/mongo/dbConnection.js"
madbConnection

import accessRouter from "./routers/accessRouter.js"
app.use(accessRouter)

import tokenChecker from "./utils/tokenHelper.js"
import filesRouter from "./routers/filesRouter.js"
app.use(tokenChecker, filesRouter)

import customModelsRouter from "./routers/modelsRouter.js"
app.use(tokenChecker, customModelsRouter)

import datasheetRouter from "./routers/datasheetRouter.js"
app.use(tokenChecker, datasheetRouter)

import bigQueryRouter from "./routers/bigQueryRouter.js"
app.use(tokenChecker, bigQueryRouter)

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))

//export default app