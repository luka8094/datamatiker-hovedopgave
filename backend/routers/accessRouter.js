import {Router} from "express"
import {ExpressValidator, body, validationResult} from "express-validator"
const authRouter = Router()

import "dotenv/config"
const {SALT_ROUNDS, JWT_ACCESS_TOKEN} = process.env
import validator from "validator"
import User from "../model/user.mjs"
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"
authRouter.post("/api/login", 
    body('email').trim().notEmpty().isEmail().isLength({min: 5, max: 30}),
    body('password').trim().notEmpty().isLength({min: 5, max: 30}),
    async (req, res) => {
    
    const{email, password} = req.body
    
    const requestValidation = validationResult(req)

    console.log(requestValidation)

    /*
    const validation = 
    validator.isLength(email,{min: 8, max: 30, blacklisted_chars:"?=!;</>"}) 
    && validator.isLength(password,{min: 8, max: 30, blacklisted_chars:"?=!;</>"})
    */

    //if(!validation) return res.status(403).send({data: "invalid email or password"})
    
    const result = await User.findOne({email: email}).select('password')
    console.log(result)


    if(!await bcrypt.compare(password, result.password)) return res.status(403).send({data: "invalid email or password"})
    delete req.body

    const token = jsonwebtoken.sign({_id: result._id}, JWT_ACCESS_TOKEN)
    delete result._id
    delete result.password
    
    console.log(token)
    res.cookie('jwt', token, {httpOnly: true, maxAge: 6 * 60 * 1000})
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