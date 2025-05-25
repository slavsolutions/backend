const express = require('express');
const router = express.Router();

router.post('/users', async (req, res) => {

    try {
        const requestType = req.body.requestType;
	    console.log(req.body);

	if (requestType === "addUser"){
		console.log('dodaje model', req.body);
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
