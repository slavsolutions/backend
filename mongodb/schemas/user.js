const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    id: {
        type: String,
        default: ()=> Date.now()
    },
    name: String,
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: String,
    createdAt: {
        type: Date,
        default: ()=> Date.now()
    },
    updatedAt: {
        type: Date,
        default: ()=> Date.now()
    },
    emailVerified: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("user", userSchema)