// models/AssetType.js
const mongoose = require('mongoose');

const assetTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String
});

module.exports = mongoose.model('AssetType', assetTypeSchema, 'assetTypes');
