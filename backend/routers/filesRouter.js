import path from "path"
import {Router} from "express"
const filesRouter = Router()
const __dirname = path.resolve(path.dirname(''))

import multer from "multer"
const storage = multer.diskStorage(
    {
    destination: function(req, file, callback){ 
        callback(null, "./temp")
    },
    filename: function(req, file, callback){
        const extension = "."+file.originalname.split(".")[1]
        callback(null, file.fieldname+"_"+Date.now()+extension)
    }
    }
)
const upload = multer({storage: storage})

import AWS from "aws-sdk"
const {
    AWS_A, 
    AWS_K, 
    AWS_BUCKET, 
    AWS_REGION
} = process.env

AWS.config.update({
    accessKeyId: AWS_A,
    secretAccessKey: AWS_K,
    region: AWS_REGION,
    ApiVersion: '2006-03-01'
})
const s3 = new AWS.S3()

import fs from "fs"
import crypto from "crypto"
import {uploadSanitizer} from "../utils/validationHelper.js"
import {validationResult} from "express-validator"
import {spawn} from "child_process"
import User from "../model/user.mjs"
import GoogleUser from "../model/googleUser.mjs"
filesRouter.post("/api/upload-file:option", [upload.single("file"), uploadSanitizer()], async (req, res) => {
    const resultBody = validationResult(req.body)
    const resultQuery = validationResult(req.params)

    if(!resultBody.isEmpty() && !resultQuery.isEmpty()) return res.status(403).send({data: "Invalid input. Please try again"})

    const {claims} = req.body
    const {option} = req.params
    const files = [req.file.filename]

    files.push(req.file.filename.split(/[_.]/g)[1])

    if(option === ":dnn"){
        const subProcess = spawn('python', ['./data/datamodels/dnn/preparation.py', JSON.stringify(files)])

        subProcess.stdout.on('data', async (data) => { 
            const columns = JSON.parse(data.toString())

            columns.splice(2,1)

            const filename = columns[1]
            const filePath = path.join(__dirname,`/temp/${filename}`)

            const fileBuffer = fs.readFileSync(filePath)
            const hash = crypto.createHash('sha256')
            const resourceId = hash.update(fileBuffer).digest('hex')

            const uploadData = {
                Bucket: AWS_BUCKET,
                Key: filename,
                Body: fileBuffer,
                contentType: "text/csv"
            }

            const remoteUpload = await s3.upload(uploadData).promise()

            if(remoteUpload) res.status(202).send({data: columns})
        })
    }

    if(option === ":rnn"){
        const subProcess = spawn('python', ['./data/datamodels/rnn/preparation.py', JSON.stringify(files)])

        subProcess.stdout.on('data', async (data) => {
            const columns = JSON.parse(data.toString())

            const filename = columns[3]
            const filePath = path.join(__dirname,`/temp/${filename}`)

            const fileBuffer = fs.readFileSync(filePath)
            const hash = crypto.createHash('sha256')
            const resourceId = hash.update(fileBuffer).digest('hex')

            const uploadData = {
                Bucket: AWS_BUCKET,
                Key: filename,
                Body: fileBuffer,
                contentType: "text/csv"
            }
            
            const remoteUpload = await s3.upload(uploadData).promise()

            columns.splice(0,2)

            if(remoteUpload) res.status(202).send({data: columns})
        })
    }

    if(option === ":som"){
        const subProcess = spawn('python', ['./data/datamodels/som/construction.py', JSON.stringify(files)])

        subProcess.stdout.on('data', async (data) => {
            const somData = JSON.parse(data.toString())

            const filename = somData[2]
            const imagePath = __dirname+`/temp/${somData[2]}`
            const imageData = fs.readFileSync(imagePath, 'base64')

            const fileBuffer = fs.readFileSync(imagePath)
            const hash = crypto.createHash('sha256')
            const resourceId = hash.update(fileBuffer).digest('hex')

            const uploadData = {
                Bucket: AWS_BUCKET,
                Key: filename,
                Body: fileBuffer,
                contentType: "image/png"
            }
            
            const remoteUpload = await s3.upload(uploadData).promise()

            if(remoteUpload) res.status(202).send({data: somData, image: imageData})
        })
    }

    if(option === ":test"){ 

        res.status(202).send({data: "reached test file endpoint"})
    }

    return res.status(500)
})

filesRouter.post("/api/save-file", async (req, res) => {
    const {filename} = req.body

    const filePath = path.join(__dirname,`/temp/${filename}`)

    res.download(filePath)
})

import {fileAccessSanitizer} from "../utils/validationHelper.js"
filesRouter.post("/api/download:option", fileAccessSanitizer(), async (req, res) => {
    const resultBody = validationResult(req.body)
    const resultQuery = validationResult(req.params)

    if(!resultBody.isEmpty() && !resultQuery.isEmpty()) return res.status(403).send({data: "invalid input. Please try again."})

    const {option} = req.params
    const {file} = req.body

    if(option === ":history"){
        const filePath = path.join(__dirname,`/temp/${file}`)

        res.download(filePath)
    }

    if(option === ":archive"){
        const {Body} = await s3.getObject({Bucket: AWS_BUCKET, Key: file}).promise()

        res.send(Body)
    }

    return res.status(500)
})

filesRouter.delete("/api/delete-file:option", fileAccessSanitizer(), async (req, res) => { 
    const resultBody = validationResult(req.body)
    const resultQuery = validationResult(req.params)

    if(!resultBody.isEmpty() && !resultQuery.isEmpty()) return res.status(403).send({data: "invalid input. Please try again."})

    const {file} = req.body
    const {option} = req.params

    if(option === ":history"){
        const filePath = path.join(__dirname, `/temp/${file}`)

        fs.unlinkSync(filePath)

        return res.status(202).send({data: "deleted file from history folder"})
    }

    if(option === ":archive"){
        const deleteFile = await s3.deleteObject({Bucket: AWS_BUCKET, Key: file}).promise()

        if(deleteFile) return res.status(202).send({data: "deleted file from archive folder"})
    }

    res.status(500).send({data: "server error"})
})

export default filesRouter