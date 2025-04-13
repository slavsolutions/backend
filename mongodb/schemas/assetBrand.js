const mongoose = require('mongoose');

const assetBrandSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String
});

module.exports = mongoose.model('AssetBrand', assetBrandSchema, 'assetBrands');
