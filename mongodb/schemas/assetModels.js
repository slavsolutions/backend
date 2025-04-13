const mongoose = require('mongoose');

const assetModels = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String
});

module.exports = mongoose.model('AssetModels', assetModels, 'assetModels');
