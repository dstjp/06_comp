const mongoose = require("mongoose");
const express = require("express");
const Part = require("../models/part");

let router = express.Router();

//GET - POST - DELETE - PUT

//Retrieve All (GET)
router.route("/parts").get(async (request, response) => {
	try {
		const parts = await Part.find({});
		response.status(200).json({ success: true, data: parts });
	} catch (error) {
		console.log("could not fetch part", error.message);
		response.status(500).json({ success: false, message: "server error" });
	}
});

//Retrieve One (GET)
//http://localhost:3000/posts/12345

router.route("/parts/:id").get(async (request, response) => {
	try {
		const parts = await Part.findOne({ _id: request.params.id });
		response.status(200).json({ success: true, data: parts });
	} catch (error) {
		console.log("could not fetch part", error.message);
		response.status(500).json({ success: false, message: "server error" });
	}
});

//Create One (POST)
router.route("/parts").post(async (request, response) => {
	let part = request.body;
	const newPart = new Part(part);
	try {
		await newPart.save();
		response.status(201).json({ success: true, data: newPart });
	} catch (error) {
		console.log("Could not create new part", error.message);
		response.status(500).json({ success: false, message: "server error" });
	}
});

//Update One (PUT) *Not Tested*
router.route("/parts/:id").put(async (request, response) => {
	const { id } = request.params;
	let part = request.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return response
			.status(401)
			.json({ success: false, message: "invalid part id" });
	}

	try {
		const updatePart = await Part.findByIdAndUpdate(id, part, { new: true });
		response.status(200).json({ success: true, data: updatePart });
	} catch (error) {
		console.log("Could not create new part", error.message);
		response.status(500).json({ success: false, message: "server error" });
	}
});

//Delete One (DELETE)
router.route("/parts/:id").delete(async (request, response) => {
	const { id } = request.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return response
			.status(401)
			.json({ success: false, message: "invalid part id" });
	}

	try {
		const parts = await Part.findByIdAndDelete({ _id: request.params.id });
		response.status(200).json({ success: true, data: parts });
	} catch (error) {
		console.log("could not delete part", error.message);
		response.status(500).json({ success: false, message: "server error" });
	}
});

module.exports = router;
