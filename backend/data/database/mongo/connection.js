import mongoose from "mongoose"

const MADB_URI = ""
const connection = mongoose.connect(MADB_URI,{
    useNewUrlParser: true,
    serverSelectionTimeoutMS: 5000,
    useUnifiedTopology: true
})
.then(console.log("Connecting. Please wait..."))
.catch((err) => console.log("Connection error:\n%s", err))
.finally(console.log("Succes! Connection established."))

export default connection
