import express from "express"
import "dotenv/config"
const app = express()
const {PORT} = process.env

import helmet from "helmet"
app.use(helmet())

import path from "path"
app.use(express.static(path.resolve("../frontend/obsidian-mindbench/dist")))


app.use(express.json({limit: "10mb"}))
app.use(express.urlencoded({extended: true, limit: "10mb", parameterLimit: 50000}))

import cookieParser from "cookie-parser"
app.use(cookieParser())


/*
import fs from "fs"
app.post("/download-file:name", (req, res) => {
    const {name} = req.params
    const file = __dirname + "/uploads"
})
*/

import madbConnection from "./data/database/mongo/dbConnection.js"
madbConnection

import authRouter from "./routers/accessRouter.js"
app.use(authRouter)

import {inputSanitizer} from "./utils/validationHelper.js"
import filesRouter from "./routers/filesRouter.js"
app.use(inputSanitizer(), filesRouter)

import customModelsRouter from "./routers/modelsRouter.js"
app.use(inputSanitizer(), customModelsRouter)

app.listen(PORT, () => console.log("Server running on port: %s", PORT))

export default app