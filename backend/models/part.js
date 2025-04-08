const mongoose = require("mongoose");

const partSchema = new mongoose.Schema({
	name: { type: String, required: true },
	type: { type: String, required: true },
});

const Part = mongoose.model("Part", partSchema);

module.exports = Part;
