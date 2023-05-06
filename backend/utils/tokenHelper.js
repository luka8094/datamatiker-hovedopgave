import "dotenv/config"
import jsonwebtoken from "jsonwebtoken"
const {JWT_ACCESS_TOKEN} = process.env

export function tokenChecker(req, res, next){
    if(typeof req.headers['jwt'] === 'string') console.log("token clear")
    next()
}