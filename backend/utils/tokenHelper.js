import "dotenv/config"
import jsonwebtoken from "jsonwebtoken"
const {JWT_ACCESS_TOKEN} = process.env

function tokenChecker(req, res, next){
    if(typeof req.cookies['jwt'] === 'string'){ }
    else return res.status(403).send({data: false})

    const jwt = req.cookies['jwt']

    const claims = jsonwebtoken.verify(jwt, JWT_ACCESS_TOKEN, (error, data) => {
        if(error) return error
        else if(data) return data
    })
    
    if(claims){
        req.body.claims = claims

        next()
    }
    else return res.status(403).send({data: false})
}

export default tokenChecker
