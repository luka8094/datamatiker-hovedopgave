import "dotenv/config"
import {Router} from "express"
import {BigQuery} from "@google-cloud/bigquery"
const bigQueryRouter = Router()
const bigQueryClient = new BigQuery()

bigQueryRouter.post("/api/bigquery/new", (req, res) => {
    const {bigQuery} = req.body

    res.status(202).send({data: "query result"})
})

export default bigQueryRouter