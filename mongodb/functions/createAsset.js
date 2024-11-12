const asset = require('./../schemas/asset')

async function createAsset(status, serialNumber, category, model, assignedToUser, department, location, brand, customer, purchaseDate, notes){
    try{
        const newAsset = await asset.create({
            status,
            serialNumber,
            category,
            model,
            assignedToUser,
            department,
            location,
            brand,
            customer,
            purchaseDate,
            notes
        })
        await newAsset.save()
        return newAsset;
    } catch (e){
        //save errors to db
        console.log(e.message)
    } 
}

module.exports = createAsset