import fs from "fs"
import path from "path"
const folderName = "temp"

const clearTemp = () => {
    fs.readdir(folderName, (error, files) => {
        if(error) throw error

        if(files.length > 0){
            for(const file in files){
                console.log(`Clearing file: ${Number(file)+1}...`)
                fs.unlink(path.join(folderName, files[file]), error => {
                    if(error) throw error
                })
            }
        }
        else return
    })
}

export default clearTemp