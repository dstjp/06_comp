const express = require("express");
const Part = require("../models/part");

let router = express.Router();

router.route("/parts").get(async (request, response) => {
	try {
		const parts = await Part.find({});
		response.status(200).json({ success: true, data: parts });
	} catch (error) {
		console.log("could not fetch part", error.message);
		response.status(500).json({ success: false, message: "server error" });
	}
});

//GET - POST - DELETE - PUT
//#1 - Retrieve All (GET)

//#2 - Retrieve One (GET)
//http://localhost:3000/posts/12345

//#3 - Create One (POST)

//#4 - Update One (PUT)

//#5 - Delete One (DELETE)
module.exports = router;
