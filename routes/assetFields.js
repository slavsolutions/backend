const express = require('express');
const router = express.Router();
const AssetField = require('../mongodb/schemas/assetField'); // Załóżmy, że masz taki schemat
const Asset = require('../mongodb/schemas/asset'); // Załóżmy, że masz taki schemat

// Pobierz pola dla konkretnego typu assetu
router.get('/getAssetTypeFields', async (req, res) => {
    try {
        const fields = await AssetField.find({ assetType: req.params.assetTypeId });
        res.json(fields);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Dodaj nowe pole dla konkretnego typu assetu
router.post('/addAssetTypeField', async (req, res) => {
    const field = new AssetField({
        ...req.body,
        assetType: req.params.assetTypeId
    });
    try {
        const newField = await field.save();
        res.status(201).json(newField);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Usuń pole
router.delete('/delAssetTypeField', async (req, res) => {
    try {
        const field = await AssetField.findById(req.params.id);
        if (!field) return res.status(404).json({ message: 'Field not found' });

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            await AssetField.deleteOne({ _id: req.params.id }, { session });
            await Asset.updateMany(
                { assetType: field.assetType },
                { $unset: { [field.name]: "" } },
                { session }
            );

            await session.commitTransaction();
            res.json({ message: 'Field deleted' });
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
