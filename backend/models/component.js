const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		manufacturer: { type: String, required: true },
	},
	{ discriminatorKey: "partType" }
);

const Component = mongoose.model("Component", componentSchema);

const cpuSchema = new mongoose.Schema({
	cores: Number,
	baseFrequency: String,
	tdp: Number,
});

const gpuSchema = new mongoose.Schema({
	memory: String,
	coreClock: String,
	tdp: Number,
});

const ramSchema = new mongoose.Schema({
	capacity: String,
	type: String,
	speed: String,
	modules: Number,
});

const storageSchema = new mongoose.Schema({
	capacity: String,
	type: { type: String, enum: ["SSD", "HDD", "NVMe"] },
	interface: String,
});

const motherboardSchema = new mongoose.Schema({
	chipset: String,
	memorySlots: Number,
	socket: String,
	maxMemory: String,
});

const psuSchema = new mongoose.Schema({
	wattage: Number,
	efficiency: String,
	modular: { type: String, enum: ["Full", "Semi", "No"] },
});

const caseSchema = new mongoose.Schema({
	dimensions: String,
	color: String,
	weight: Number,
});

const CPU = Component.discriminator("CPU", cpuSchema);
const GPU = Component.discriminator("GPU", gpuSchema);
const RAM = Component.discriminator("RAM", ramSchema);
const Storage = Component.discriminator("Storage", storageSchema);
const Case = Component.discriminator("Case", caseSchema);
const Motherboard = Component.discriminator("Motherboard", motherboardSchema);
const PSU = Component.discriminator("PSU", psuSchema);

module.exports = {
	Component,
	CPU,
	GPU,
	RAM,
	Storage,
	Case,
	Motherboard,
	PSU,
};
