import mongoose from "mongoose"

const userDataSchema = mongoose.Schema({
    files: {
        type: Array
    }
})

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    settings: userDataSchema
})

const User = mongoose.model("users", userSchema)
export default User
