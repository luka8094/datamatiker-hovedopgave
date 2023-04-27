import mongoose from "mongoose"

const userDataSchema = mongoose.Schema({
    files: {
        type: Array
    }
})

const userSchema = mongoose.Schema({
    username: {
        type: String,

    },
    password: {
        type: String
    },
    email: {
        type: String
    }
})