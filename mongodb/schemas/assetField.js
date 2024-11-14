const mongoose = require('mongoose');

const assetFieldSchema = new mongoose.Schema({
  assetType: { type: mongoose.Schema.Types.ObjectId, ref: 'AssetType', required: true },
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ['String', 'Number', 'Date', 'Boolean'] },
  required: { type: Boolean, default: false },
  defaultValue: mongoose.Schema.Types.Mixed,
  validation: {
    enum: [String, Number]
  }
});

module.exports = mongoose.model('AssetField', assetFieldSchema);
