import "dotenv/config"
import CryptoJS from "crypto-js"
const {KEY_A, KEY_B} = process.env

export function encryptUsername(usernamePT){
    return CryptoJS.AES.encrypt(usernamePT, KEY_A).toString()
}

export function encryptFiles(filesPT){
    return CryptoJS.AES.encrypt(filesPT, KEY_B).toString()
}

export function decryptUsername(usernameCT){
    return CryptoJS.AES.decrypt(usernameCT, KEY_A).toString(CryptoJS.enc.Utf8)
}

export function decryptFiles(filesCT){
    return CryptoJS.AES.decrypt(filesCT, KEY_B).toString(CryptoJS.enc.Utf8)
}