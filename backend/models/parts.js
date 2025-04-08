const mongoose = require("mongoose");

const partsSchema = new mongoose.Schema({
	name: String,
	lastname: String,
});

module.exports = mongoose.model("Parts", partsSchema);
