const mongoose = require('mongoose');

const assetModels = new mongoose.Schema({
	category: {type: String, required: true, unique: false},
	brand: {type: String, required: true, unique: false},
	name: { type: String, required: true, unique: true },
	description: String
});

module.exports = mongoose.model('AssetModels', assetModels, 'assetModels');
