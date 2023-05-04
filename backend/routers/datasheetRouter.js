import {Router} from "express"
import XLSX from "xlsx"
const datasheetRouter = Router()

datasheetRouter.get("/api/get-sheet", (req, res) => {

})

datasheetRouter.post("/api/upload-sheet", (req, res) =>{
    const {fileName} = req.body

    const workbook = XLSX.readFile(fileName)
    const sheetNamesList = workbook.SheetNames

    const data = {}

    for(c in sheetNamesList){}

})

datasheetRouter.delete("/api/delete-sheet", (req, res) => {

})

export default datasheetRouter