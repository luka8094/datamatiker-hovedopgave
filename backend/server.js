import express from "express"
import "dotenv/config"
const app = express()
const {PORT} = process.env

app.get("/", (req, res) => {
    res.send("Endpoint connection test status: OK")
})

import { handler } from "../frontend/obsidian-foresight/build/handler.js"
app.use(handler)

app.listen(PORT, () => console.log("Server running on port: %s", PORT))