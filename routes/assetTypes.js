const express = require('express');
const router = express.Router();
const AssetType = require('../mongodb/schemas/assetType.js');

// Pobierz wszystkie typy assetów
router.get('/getAssetTypes', async (req, res) => {

    try {
        const types = await AssetType.find();
	console.log(types);
        //res.json(types);
	res.status(200).json(types);
    } catch (error) {
	console.log(error);
        res.status(500).send({ status: 'error',  message: error.message });
    }
});

// Dodaj nowy typ assetu
router.post('/addAssetType', async (req, res) => {
    const assetType = new AssetType({name: req.body.assetCategory});
	console.log('/addAssetType POST :', assetType)
	try {
        const newAssetType = await assetType.save();
        res.status(201).json(newAssetType);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Usuń typ assetu
router.post('/delAssetType', async (req, res) => {
    try {
	const id = req.body.payload;
	console.log(id);
	await AssetType.findByIdAndDelete(id);
        res.json({ message: 'Asset type deleted' });
	console.log("deleted");
    } catch (error) {
        res.status(500).json({ message: error.message });
	console.log(error)
    }
});

module.exports = router;
