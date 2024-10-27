const asset = require('./../schemas/asset')


async function createAsset(status, serial, category, model, assignedToUser, department, location, brand, customer, purchaseDate, notes){
    try{
        const newAsset = await asset.create({
            status,
            serial,
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
        newAsset.save()
    } catch (e){
        //save errors to db
        console.log(e.message)
    } 
}

module.exports = createAsset