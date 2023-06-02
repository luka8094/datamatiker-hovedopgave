import "dotenv/config"
import {Router} from "express"
import {validationResult} from "express-validator"
const accessRouter = Router()

const {
    JWT_ACCESS_TOKEN, 
    GOOGLE_CLIENT_ID, 
    GOOGLE_CLIENT_SECRET, 
    GOOGLE_OAUTH_REDIRECT_URL} = process.env
import User from "../model/user.mjs"
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"
import getGoogleOAuth from "../utils/googleURLtermsHelper.js"
accessRouter.get("/api/google", (req, res) => {
    res.send({data: getGoogleOAuth()})
})

import axios from "axios"
import qs from 'qs'
import GoogleUser from "../model/googleUser.mjs"
import {
    encryptGoogleUsername,
    encryptGoogleUserFiles,
    decryptGoogleUsername,
    decryptGoogleUserFiles
} from "../utils/sha256Helper.js"
accessRouter.get("/api/sessions/google/auth", async (req, res) => {
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

        const userResponse = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
                {headers: {
                    Authorization: `Bearer ${id_token}`
                }
            }
        )
        const {data} = userResponse

        Object.keys(tokensResponse).forEach(key => delete tokensResponse[key])

        const checkUser = await GoogleUser.findOne({email: data.email})
        const tokenData =  {}

        if(!checkUser){
            const newGoogleUser = new GoogleUser({
                username: encryptGoogleUsername(data.name),
                email: data.email,
                settings: {
                    files: encryptGoogleUserFiles(JSON.stringify([]))
                }
            })
            
            const registerGoogleUser = await newGoogleUser.save()

            if(registerGoogleUser){ 
                const {_id} = registerGoogleUser
                tokenData._id = _id
            }

            Object.keys(registerGoogleUser).forEach(key => delete registerGoogleUser[key])
        }else{ 
            tokenData._id = checkUser._id    

            Object.keys(checkUser).forEach(key => delete checkUser[key])
        }

        Object.keys(data).forEach(key => delete data[key])

        const accessToken = jsonwebtoken.sign({_id: tokenData._id, google_id: true},JWT_ACCESS_TOKEN)
        delete tokenData._id

        res.cookie('jwt', accessToken, {maxAge: 20 * 60 * 1000, httpOnly: true})
        res.redirect("/#0")
    }catch(error){
        console.error(error.message)
    }
})

import {loginSanitizer} from "../utils/validationHelper.js"
accessRouter.post("/api/login", loginSanitizer(), async (req, res) => {
    const errors = validationResult(req)
    
    if(!errors.isEmpty()) return res.status(403).send({data: "invalid credentials"})
    const{email, password} = req.body
    delete req.body
    
    const result = await User.findOne({email: email})

    if(!await bcrypt.compare(password, result.password)) return res.status(403).send({data: "invalid credentials"})
    
    const token = jsonwebtoken.sign({_id: result._id, google_id: false}, JWT_ACCESS_TOKEN)
    
    Object.keys(result).forEach(key => delete result[key])
    
    res.cookie('jwt', token, {httpOnly: true, maxAge: 20 * 60 * 1000})
    res.status(200).send({data: true})
})

import {
    decryptUsername, 
    decryptFiles
} from "../utils/sha256Helper.js"
import tokenChecker from "../utils/tokenHelper.js"
accessRouter.post("/api/user", tokenChecker, async (req, res) => {
    const {claims} = req.body
    delete req.body.claims

    const googleAccess = claims.google_id

    const userdata = {}
    const result = googleAccess ? await GoogleUser.findOne({_id: claims._id}) : await User.findOne({_id: claims._id})

    userdata.username = googleAccess ? decryptGoogleUsername(result.username) : decryptUsername(result.username)
    userdata.files = googleAccess ? decryptGoogleUserFiles(result.settings.files) : decryptFiles(result.settings.files)

    Object.keys(result).forEach(key => delete result[key])

    res.status(202).send({data: {authorized: true, bigquery: googleAccess, user: {userdata: userdata}}})
})

import clearTemp from "../utils/tempHelper.js"
accessRouter.delete("/api/logout", (req, res) => {
    res.cookie('jwt',{maxAge: 0})

    clearTemp()

    res.sendStatus(200)
})

export default accessRouter