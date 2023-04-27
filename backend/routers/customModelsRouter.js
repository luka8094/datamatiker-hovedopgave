import {Router} from "express"
const customModelsRouter = Router()

import {spawn} from "child_process"
customModelsRouter.post("/api/custom", (req, res) => {
    const {test} = req.body

    const sub_process = spawn('python', ['./ann/test2.py', JSON.stringify(test)])

    sub_process.stdout.on('data', (data) => {
        res.send({data: JSON.parse(data.toString())})
    })
})

export default customModelsRouter