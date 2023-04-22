import {Router} from "express"
const filesRouter = Router()

/*
app.get("/test", (req, res) => { 
    res.send({data:"Endpoint connection test status: OK"})
})

import multer from "multer"
const upload = multer({dest: "./temp"})

app.post("/upload-file", upload.single("file"), async (req, res) => {
    console.log(req.file)
    res.send({message: "All A-OK"})
})

*/
import {spawn} from "child_process"
filesRouter.post("/predict", async(req, res) => {
    const {input} = req.body

    const pass_back_test = [input]
    const sub_process = spawn('python', ['../ann/test.py', JSON.stringify(pass_back_test)])

    sub_process.stdout.on('data', (data) => {
        console.log("Data pass back status: %s", JSON.parse(data.toString()))
    })
})

