const express = require('express');
const router = express.Router();
const AssetType = require('../mongodb/schemas/assetType.js');
const modelSchema = require('../mongodb/schemas/assetModels.js')
const brandSchema = require('../mongodb/schemas/assetBrand.js')

router.post('/getData', async (req, res) => {

    try {
        const requestType = req.body.requestType;
	console.log(req.body);
	if (requestType === "addModel"){
		console.log('dodaje model', req.body.model);
		const newModel = new modelSchema({category: req.body.model.category, brand: req.body.model.brand, name: req.body.model.model});
		console.log(newModel);
		const action = await newModel.save();
		const list = await modelSchema.find();
		res.status(200).json({action, list})
	}
	else if(requestType === "getModelList"){
		const modelList = await modelSchema.find();
		res.status(200).json(modelList)
	}
	else if(requestType === "deleteModel"){
		const modelToDelete = req.body.modelToDelete;
		const deletion = await modelSchema.findByIdAndDelete(modelToDelete);
		const leftoverModels = await modelSchema.find();
		console.log(deletion);
		console.log('xxxxxxxxxxxxxx');
		console.log(leftoverModels);
		if(deletion){
			res.status(200)
		}
		else{
			res.status(200).json({message: deletion})
		}
	}
	else if (requestType === "getAssetBrandList"){
		const brandList = await brandSchema.find();
		res.status(200).json(brandList)
	}
	else if (requestType === "addAssetBrand"){
		const newBrand = new brandSchema({name: req.body.brand});
		const action = await newBrand.save();
		const list = await brandSchema.find();
		res.status(200).json({action, list})
	}
	else if (requestType === "deleteAssetBrand"){
		const delBrand = req.body.brand;
		console.log("deletion-brand", delBrand);
		const deletion = await brandSchema.findByIdAndDelete(delBrand);
		if (deletion){
			res.status(200).json({message: deletion})
		}
		else{
			res.status(200).json({message: deletion})
		}
	}
    } catch (error) {
	console.log(error);
        res.status(500).send({ status: 'error',  message: error.message });
    }
});

module.exports = router;
