import mongoose from "mongoose";
const Part = require("../models/part");

export async function getParts(request, response) {
	try {
		const parts = await Part.find({});
		response.status(200).json({ success: true, data: parts });
	} catch (error) {
		console.log("could not fetch part", error.message);
		response.status(500).json({ success: false, message: "server error" });
	}
}
