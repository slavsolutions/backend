// routes/assets.js
const express = require('express');
const router = express.Router();
const createAssetInDb = require('../mongodb/functions/createAsset');
const userDoExists = require('../mongodb/functions/userDoExists');

router.post('/create', async (req, res) => {
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

module.exports = router;
