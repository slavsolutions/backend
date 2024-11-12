const mongoose = require('mongoose')


const assetSchema = new mongoose.Schema({
    assetTag: {
        type: String,
        default: ()=> Date.now()
    },
    status: String,
    createdAt: {
        type: Date,
        default: ()=> Date.now()
    },
    updatedAt: {
        type: Date,
        default: ()=> Date.now()
    },
    serial: String,
    category: String,
    model: String,
    assignedToUser: String,
    department: String,
    location: String,
    brand: String,
    customer: String,
    purchaseDate: String,
    notes: String,
})

module.exports = mongoose.model("asset", assetSchema)