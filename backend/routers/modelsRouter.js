import {Router} from "express"
import path from "path"
const customModelsRouter = Router()
const __dirname = path.resolve(path.join(''))

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
    region: AWS_REGION
})

const s3 = new AWS.S3()

import {spawn} from "child_process"
import fs from "fs"
import crypto from "crypto"
customModelsRouter.post("/api/custom:option", (req, res) => {
    delete req.body.claims
    delete req.body.input

    const {option} = req.params
    const data = req.body

    if(option === ":dnn"){
        const subProcess = spawn('python', ['./data/datamodels/dnn/training.py', JSON.stringify(data)])

        subProcess.stdout.on('exit', (code, signal) => {
            if(code) console.log("Exited on code: ",code)
            if(signal) console.log("Exited on signal: ",signal)
        })
        
        subProcess.on('error', (error) => {

            res.status(400).send({data: "something went wrong"})
        })

        subProcess.stdout.on('data', async (data) => {
            const settings = JSON.parse(data.toString())

            const filename = settings[5]
            const filePath = path.join(__dirname,`/temp/${filename}`)

            const fileContent = fs.readFileSync(filePath)
            const hash = crypto.createHash('sha256')
            const resourceId = hash.update(fileContent).digest('hex')

            const uploadData = {
                Bucket: AWS_BUCKET,
                Key: filename,
                Body: fileContent,
                ContentType: "application/x-hdf5"
            }
            
            const remoteUpload = await s3.upload(uploadData).promise()

            if(remoteUpload) res.status(202).send({data: {modelComplete: true, modelSettings: settings}})
        })

    }
    if(option === ":rnn"){
        const subProcess = spawn('python', ['./data/datamodels/rnn/training.py', JSON.stringify(data)])

        subProcess.stdout.on('exit', (code, signal) => {
            if(code) console.log("Exited on code: ",code)
            if(signal) console.log("Exited on signal: ",signal)

            res.status(400).send({data: "something went wrong"})
        })

        subProcess.stderr.on('error', (error) => {
            console.log(error)
            res.status(400).send({data: "something went wrong"})
        })

        subProcess.stdout.on('data', async (data) => {
            const settings = JSON.parse(data.toString())

            const filename = settings[10]
            const filePath = path.join(__dirname,`/temp/${filename}`)

            const fileContent = fs.readFileSync(filePath)
            const hash = crypto.createHash('sha256')
            const resourceId = hash.update(fileContent).digest('hex')

            const uploadData = {
                Bucket: AWS_BUCKET,
                Key: filename,
                Body: fileContent,
                ContentType: "application/x-hdf5"
            }
            
            const remoteUpload = await s3.upload(uploadData).promise()

            if(remoteUpload) res.status(202).send({data: {modelComplete: true, modelSettings: settings}})
        })
    }
    return res.status(500)
})

customModelsRouter.post("/api/predict", async(req, res) => {

    res.send({data: "reached prediction endpoint"})
})

export default customModelsRouter