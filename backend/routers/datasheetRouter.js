import {Router} from "express"
import path from "path"
const datasheetRouter = Router()

datasheetRouter.get("/api/get-sheet", (req, res) => {

})

import multer from "multer"
const storage = multer.diskStorage(
    {
    destination: function(req, file, callback){ 
        callback(null, "./temp")
    },
    filename: function(req, file, callback){
        const extension = "."+file.originalname.split(".")[1]
        callback(null, file.fieldname+"_"+Date.now()+extension)
    }
    }
)
const upload = multer({storage: storage})

import * as XLSX from "xlsx/xlsx.mjs"
import * as fs from "fs"
datasheetRouter.post("/api/upload-sheet", upload.single("file"), (req, res) =>{
    XLSX.set_fs(fs)

    const {path} = req.file
    const workbook = XLSX.readFile(path)
    const sheetList = workbook.SheetNames
    const workbookHeaders = XLSX.readFile(path)

    const jsonSheet = XLSX.utils.sheet_to_json(workbookHeaders.Sheets[sheetList[0]])
    const headersSet = new Set()

    jsonSheet.forEach(item => {
        for(const headerRef in item){
            headersSet.add(headerRef)
        }
    })
    
    res.status(202).send({data: {columns: [...headersSet], rows: jsonSheet}})
})

export default datasheetRouter