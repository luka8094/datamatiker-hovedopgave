import "dotenv/config"
import {Router} from "express"
import {validationResult} from "express-validator"
const authRouter = Router()

const {
    JWT_ACCESS_TOKEN, 
    GOOGLE_CLIENT_ID, 
    GOOGLE_CLIENT_SECRET, 
    GOOGLE_OAUTH_REDIRECT_URL} = process.env
import User from "../model/user.mjs"
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"
import getGoogleOAuth from "../utils/googleURLtermsHelper.js"
authRouter.get("/api/google", (req, res) => {
    res.send({data: getGoogleOAuth()})
})

import axios from "axios"
import qs from 'qs'
authRouter.get("/api/sessions/google/auth", async (req, res) => {
    const {code} = req.query
    const URL = "https://oauth2.googleapis.com/token"

    const values = {
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_OAUTH_REDIRECT_URL,
        grant_type: "authorization_code"
    }

    try{
        const tokensResponse = await axios.post(
            URL, 
            qs.stringify(values),
            { 
                headers: {
                'Content-Type': "application/x-www-form-urlencoded"
                } 
            }
        )

        const {id_token, access_token} = tokensResponse.data

        const googleUser = jsonwebtoken.decode(id_token)

        const userResponse = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
                {headers: {
                    Authorization: `Bearer ${id_token}`
                }
            }
        )

        console.log(userResponse)
        const accessToken = jsonwebtoken.sign({at: access_token},JWT_ACCESS_TOKEN)
        
        res.cookie('jwt', accessToken, {maxAge: 5 * 60 * 1000, httpOnly: true})
        res.redirect("/#0")
    }catch(error){
        console.error(error.message)
    }
})

import {loginSanitizer} from "../utils/validationHelper.js"
authRouter.post("/api/login", loginSanitizer(), async (req, res) => {
    const errors = validationResult(req)
    const{email, password} = req.body

    if(!errors.isEmpty()) return res.status(403).send({data: "invalid credentials"})
    
    const result = await User.findOne({email: email}).select('password')


    if(!await bcrypt.compare(password, result.password)) return res.status(403).send({data: "invalid email or password"})
    delete req.body

    const token = jsonwebtoken.sign({_id: result._id}, JWT_ACCESS_TOKEN)
    delete result._id
    delete result.password
    
    res.cookie('jwt', token, {httpOnly: true, maxAge: 6 * 60 * 1000})
    res.send({data:true})
})

authRouter.post("/api/user", (req, res) => {
    if(typeof req.cookies['jwt'] !== 'string') return res.send({data: false})
    const jwt = req.cookies['jwt']

    const claims = jsonwebtoken.verify(jwt, JWT_ACCESS_TOKEN, (error, data) => {
            if(error) return false
            else return data
        }
    )

    if(!claims) return res.send({data: false})
    else res.status(202).send({data: true})
})

authRouter.delete("/api/logout", (req, res) => {
    res.cookie('jwt',{maxAge: 0})
    res.sendStatus(200)
})

export default authRouter