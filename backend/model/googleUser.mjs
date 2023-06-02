import mongoose from "mongoose"

const googleUserDataSchema = mongoose.Schema({
    files: {
        type: Array
    }
})

const googleUserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    settings: googleUserDataSchema
})

const GoogleUser = mongoose.model("googleUsers", googleUserSchema)
export default GoogleUser
