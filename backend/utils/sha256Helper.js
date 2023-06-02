import "dotenv/config"
import CryptoJS from "crypto-js"
const {
    KEY_A, 
    KEY_B, 
    KEY_C, 
    KEY_D
} = process.env

export function encryptUsername(username){
    return CryptoJS.AES.encrypt(username, KEY_A).toString()
}

export function encryptFiles(files){
    return CryptoJS.AES.encrypt(files, KEY_B).toString()
}

export function decryptUsername(username){
    return CryptoJS.AES.decrypt(username, KEY_A).toString(CryptoJS.enc.Utf8)
}

export function decryptFiles(files){
    return CryptoJS.AES.decrypt(files, KEY_B).toString(CryptoJS.enc.Utf8)
}

export function encryptGoogleUsername(googleUsername){
    return CryptoJS.AES.encrypt(googleUsername, KEY_C).toString()
}

export function encryptGoogleUserFiles(googleFiles){
    return CryptoJS.AES.encrypt(googleFiles, KEY_D).toString()
}

export function decryptGoogleUsername(googleUsername){
    return CryptoJS.AES.decrypt(googleUsername, KEY_C).toString(CryptoJS.enc.Utf8)
}

export function decryptGoogleUserFiles(googleFiles){
    return CryptoJS.AES.decrypt(googleFiles, KEY_D).toString(CryptoJS.enc.Utf8)
}