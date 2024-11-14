// routes/assets.js
const express = require('express');
const router = express.Router();
const createAssetInDb = require('../mongodb/functions/createAsset');
const userDoExists = require('../mongodb/functions/userDoExists');
const Asset = require('../mongodb/schemas/asset'); // Załóżmy, że masz taki model

// Pobierz wszystkie assety
router.get('/listAssets', async (req, res) => {
    try {
        const assets = await Asset.find();
        res.json(assets);
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', message: error.message });
    }
});

// Stwórz nowy asset
router.post('/createAsset', async (req, res) => {
    try {
        const isAlreadyCreated = await userDoExists(req.body.serial);
        if (isAlreadyCreated == null) {
            await createAssetInDb(
                req.body.status,
                req.body.serialNumber,
                req.body.category,
                req.body.model,
                req.body.assignedToUser,
                req.body.department,
                req.body.location,
                req.body.brand,
                req.body.customer,
                req.body.purchaseDate,
                req.body.notes
            );
            res.send({
                status: 'success',
                message: 'Asset ' + req.body.serialNumber + ' created successfully'
            });
        } else {
            res.send({
                status: 'failure',
                reason: 'Asset already exists.'
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({ status: 'error', message: e.message });
    }
});

// Usuń asset
router.delete('/:id', async (req, res) => {
    try {
        const asset = await Asset.findByIdAndDelete(req.params.id);
        if (!asset) {
            return res.status(404).send({ status: 'error', message: 'Asset not found' });
        }
        res.send({ status: 'success', message: 'Asset deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', message: error.message });
    }
});

module.exports = router;
