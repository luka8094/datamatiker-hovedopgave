import fs from "fs"
import {exec} from "child_process"
const dir = process.cwd()

export const setup = () => {
    console.log(dir)
    //exec("mkdir temp",{cwd: dir})
    fs.mkdir(dir+"/temp")
}

export const clear = () => {
    console.log(dir)
    //exec("del /s /temp",{cwd: dir})
    fs.rmdir(dir+"/temp",{force: true})
}