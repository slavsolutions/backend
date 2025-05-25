const express = require('express');
const router = express.Router();
const userSchema = require('../mongodb/schemas/user.js')

router.post('/users', async (req, res) => {

    try {
        const requestType = req.body.requestType;
	    console.log(req.body);

	if (requestType === "addUser"){
		console.log('dodaje model', req.body);
        const newUser = req.body.userData;
        const addNewUser = await userSchema.create(newUser);
        if(addNewUser){
            console.log('dodaje usera', addNewUser);
            res.status(201).json(addNewUser);
        }
        else{
            console.log('nie dodaje usera', addNewUser);
            res.status(400).json({ message: 'User not created' });
        }
	}
	else if(requestType === "deleteUser"){
		console.log('dodaje model', req.body);
	}
    else if(requestType === "updateUser"){
        console.log('updatuje usera', req.body)
    }
    } catch (error) {
	    console.log(error);
        res.status(500).send({ status: 'error',  message: error.message });
    }
});

module.exports = router;
