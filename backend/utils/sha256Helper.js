import "dotenv/config"
import CryptoJS from "crypto-js"
const {A_KEY, B_KEY} = process.env

export function encryptUsername(usernamePT){
    return CryptoJS.AES.encrypt(usernamePT, A_KEY).toString()
}

export function encryptFiles(filesPT){
    return CryptoJS.AES.encrypt(filesPT, B_KEY).toString()
}

export function decryptUsername(usernameCT){
    return CryptoJS.AES.decrypt(usernameCT, A_KEY).toString(CryptoJS.enc.Utf8)
}

export function decryptFiles(filesCT){
    return CryptoJS.AES.decrypt(filesCT, A_KEY).toString(CryptoJS.enc.Utf8)
}