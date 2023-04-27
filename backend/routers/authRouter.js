import {Router} from "express"
const authRouter = Router()

import * as jwt from "jsonwebtoken"
authRouter.post("/api/login", (req, res) => {
    console.log("reached login")
    res.send({data:true})
})


authRouter.post("/api/user", (req, res) => {
    res.send({data: "user data"})
})

authRouter.delete("/api/logout", (req, res) => {
    console.log("reached logout")
    res.send({data:false})
})

export default authRouter