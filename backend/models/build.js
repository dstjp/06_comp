const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pcBuildSchema = new Schema({
	name: { type: String, required: true },
	user: { type: Schema.Types.ObjectId, ref: "User" },
	cpu: { type: Schema.Types.ObjectId, ref: "Component" },
	gpu: { type: Schema.Types.ObjectId, ref: "Component" },
	ram: { type: Schema.Types.ObjectId, ref: "Component" },
	storage: { type: Schema.Types.ObjectId, ref: "Component" },
	motherboard: { type: Schema.Types.ObjectId, ref: "Component" },
	case: { type: Schema.Types.ObjectId, ref: "Component" },
	psu: { type: Schema.Types.ObjectId, ref: "Component" },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

const Build = mongoose.model("Build", pcBuildSchema);

module.exports = Build;
