import express from "express"
import "dotenv/config"
const app = express()
const {PORT} = process.env

//AWS cloud connection test
import AWS from "aws-sdk"
const {
    AWS_A, 
    AWS_K, 
    AWS_BUCKET, 
    AWS_REGION
} = process.env

AWS.config.update({
    accessKeyId: AWS_A,
    secretAccessKey: AWS_K
})

const s3 = new AWS.S3({region: AWS_REGION})

;(async() => {
    await s3.putObject({
        Body: "this is a test",
        Bucket: AWS_BUCKET,
        Key: "file-upload-test.txt"
    }).promise()
})()

import path from "path"
app.use(express.static(path.resolve("../frontend/obsidian-mindbench/dist")))

import * as bodyParser from "body-parser"
app.use(express.json({limit: "10mb"}))
app.use(express.urlencoded({extended: true, limit: "10mb", parameterLimit: 50000}))

app.get("/test", (req, res) => { 
    res.send({data:"Endpoint connection test status: OK"})
})

import multer from "multer"
const upload = multer({dest: "./uploads"})

app.post("/upload-file", upload.single("file"), async (req, res) => {
    console.log(req.file)
    res.send({message: "All A-OK"})
})

/*
import fs from "fs"
app.post("/download-file:name", (req, res) => {
    const {name} = req.params
    const file = __dirname + "/uploads"
})
*/

app.listen(PORT, () => console.log("Server running on port: %s", PORT))