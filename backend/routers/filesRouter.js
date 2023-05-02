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
        const randomized = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
        const extension = "."+file.originalname.split(".")[1]
        callback(null, randomized(32)+extension)
    }
    }
)
const upload = multer({storage: storage})

filesRouter.post("/upload-file", upload.single("file") , async (req, res) => {
    console.log(req.file.originalname)
    console.log(req.file.filename)
    res.send({data: true})
})


import {spawn} from "child_process"
filesRouter.post("/api/download", async (req, res) => {
    //console.log("file received: %s", req.body.file)
    //const {file} = req.body
    const pass_value = [2]
    const {file} = req.body
    //let result = []

    /*
    const sub_process = spawn('python', ['./ann/test2.py', JSON.stringify(pass_value)])
        
    sub_process.stdout.on('data', (data) => {
        //result.push(data.toString())
        //res.send({data: result})
       
    })

    sub_process.stderr.on('data', (data) => {
        console.error("An error occured: %s", data.toString())
    })
    */

    const file_download = path.join(__dirname, "/temp/test.h5")
    console.log(file_download)
    res.download(file_download)
})

import validator from "validator"
filesRouter.post("/api/predict", async(req, res) => {
    console.log(req.body)
    const {input} = req.body
    console.log(input)

    if(!validator.isNumeric(input)) return res.send({data:"invalid input"})

    const pass_back_test = [input]

    const sub_process = spawn('python', ['./ann/test.py', JSON.stringify(pass_back_test)])

    sub_process.stdout.on('data', (data) => {
        res.send({data: JSON.parse(data.toString())})
    })
})

export default filesRouter

