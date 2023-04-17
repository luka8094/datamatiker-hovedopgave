import express from "express"
import "dotenv/config"
const app = express()
const {PORT} = process.env

app.use(express.json())

app.get("/", (req, res) =>{
    res.redirect("/main")
})

app.get("/test", (req, res) => { 
    res.send({data:"Endpoint connection test status: OK"})
})

import { handler } from "../frontend/obsidian-foresight/build/handler.js"
app.use(handler)

app.listen(PORT, () => console.log("Server running on port: %s", PORT))