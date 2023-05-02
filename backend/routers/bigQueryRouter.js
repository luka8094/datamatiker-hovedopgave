import "dotenv/config"
import {Router, response} from "express"
import {BigQuery} from "@google-cloud/bigquery"
const bigQueryRouter = Router()
const bigQueryClient = new BigQuery()

bigQueryRouter.post("/api/new-query", (req, res) => {
    res.send({data: "query created!"})
})

export default bigQueryRouter