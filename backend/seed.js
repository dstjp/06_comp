const {
	CPU,
	GPU,
	RAM,
	Storage,
	Case,
	Motherboard,
	PSU,
} = require("./models/part");

const cpus = [
	{
		name: "Ryzen 7 5800X",
		manufacturer: "AMD",
		cores: 8,
		baseFrequency: "3.8 GHz",
		tdp: 105,
	},
	{
		name: "Core i9-12900K",
		manufacturer: "Intel",
		cores: 16,
		baseFrequency: "3.2 GHz",
		tdp: 125,
	},
	{
		name: "Ryzen 5 5600X",
		manufacturer: "AMD",

		cores: 6,
		baseFrequency: "3.7 GHz",
		tdp: 65,
	},
	{
		name: "Core i9-14900K",
		manufacturer: "Intel",
		cores: 24,
		baseFrequency: "3.2 GHz",
		tdp: 125,
	},
	{
		name: "Ryzen 5 7600",
		manufacturer: "AMD",
		cores: 6,
		baseFrequency: "3.8 GHz",
		tdp: 65,
	},
];

const gpus = [
	{
		name: "GeForce RTX 3080",
		manufacturer: "NVIDIA",
		memory: "10GB",
		coreClock: "1440 MHz",
		tdp: 320,
	},
	{
		name: "Radeon RX 6800 XT",
		manufacturer: "AMD",
		memory: "16GB",
		coreClock: "1825 MHz",
		tdp: 300,
	},
	{
		name: "GeForce RTX 3070",
		manufacturer: "NVIDIA",
		memory: "8GB",
		coreClock: "1500 MHz",
		tdp: 220,
	},
	{
		name: "RTX 5090",
		manufacturer: "NVIDIA",
		memory: "32GB",
		coreClock: "1800 MHz",
		tdp: 450,
	},
	{
		name: "RX 8900 XT",
		manufacturer: "AMD",
		memory: "24GB",
		coreClock: "2100 MHz",
		tdp: 400,
	},
];

const rams = [
	{
		name: "Vengeance LPX 16GB",
		manufacturer: "Corsair",
		capacity: "16GB",
		type: "DDR4",
		speed: "3200MHz",
		modules: 2,
	},
	{
		name: "Trident Z RGB 32GB",
		manufacturer: "G.Skill",
		capacity: "32GB",
		type: "DDR4",
		speed: "3600MHz",
		modules: 2,
	},
	{
		name: "DDR5 ECC",
		manufacturer: "Samsung",
		capacity: "64GB",
		type: "DDR5 ECC",
		speed: "4800MHz",
		modules: 2,
	},
	{
		name: "Vengeance RGB DDR5",
		manufacturer: "Corsair",
		capacity: "32GB",
		type: "DDR5",
		speed: "6000MHz",
		modules: 2,
	},
	{
		name: "Fury Beast",
		manufacturer: "Kingston",
		capacity: "32GB",
		type: "DDR5",
		speed: "5600MHz",
		modules: 2,
	},
];

const storages = [
	{
		name: "970 EVO Plus 1TB",
		manufacturer: "Samsung",
		capacity: "1TB",
		type: "NVMe",
		interface: "PCIe 3.0 x4",
	},
	{
		name: "Barracuda 2TB",
		manufacturer: "Seagate",
		capacity: "2TB",
		type: "HDD",
		interface: "SATA 6.0Gb/s",
	},
	{
		name: "WD Blue SN550 500GB",
		manufacturer: "Western Digital",
		capacity: "500GB",
		type: "NVMe",
		interface: "PCIe 3.0 x4",
	},
	{
		name: "P5 Plus",
		manufacturer: "Crucial",
		capacity: "1TB",
		type: "SSD",
		interface: "PCIe 4.0",
	},
	{
		name: "KC3000",
		manufacturer: "Kingston",
		capacity: "1TB",
		type: "SSD",
		interface: "PCIe 4.0",
	},
];

const cases = [
	{
		name: "4000D Airflow",
		manufacturer: "Corsair",
		dimensions: "453mm x 230mm x 466mm",
		weight: 7.8,
		color: "Black",
	},
	{
		name: "H510",
		manufacturer: "NZXT",
		dimensions: "428mm x 210mm x 460mm",
		weight: 6.6,
		color: "White",
	},
	{
		name: "Meshify 2",
		manufacturer: "Fractal Design",
		dimensions: "388mm x 215mm x 560mm",
		weight: 5.6,
		color: "Blue",
	},
	{
		name: "NR200P",
		manufacturer: "Cooler Master",
		dimensions: "376mm x 185mm x 274mm",
		weight: 7.2,
		color: "Black",
	},
	{
		name: "Eclipse P500A",
		manufacturer: "Phanteks",
		dimensions: "510 x 240mm x 505mm",
		weight: 9.6,
		color: "Pink",
	},
];

const motherboards = [
	{
		name: "B550 AORUS PRO",
		manufacturer: "Gigabyte",
		socket: "AM4",
		chipset: "B550",
		memorySlots: 4,
		maxMemory: "128GB",
	},
	{
		name: "ROG STRIX Z690-E GAMING",
		manufacturer: "ASUS",
		socket: "LGA1700",
		chipset: "Z690",
		memorySlots: 4,
		maxMemory: "128GB",
	},
	{
		name: "ROG Crosshair X870E",
		manufacturer: "ASUS",
		socket: "AM5",
		chipset: "X870",
		memorySlots: 4,
		maxMemory: "128GB",
	},
	{
		name: "MPG X870 Gaming Plus",
		manufacturer: "MSI",
		socket: "AM5",
		chipset: "X870",
		memorySlots: 4,
		maxMemory: "256GB",
	},
	{
		name: "ROG Strix B750E Gaming WiFi",
		manufacturer: "ASRock",
		socket: "AM5",
		chipset: "B750",
		memorySlots: 4,
		maxMemory: "128GB",
	},
];

const psus = [
	{
		name: "RM750x",
		manufacturer: "Corsair",
		wattage: 750,
		efficiency: "80+ Gold",
		modular: "Full",
	},
	{
		name: "SuperNOVA 850 G6",
		manufacturer: "EVGA",
		wattage: 850,
		efficiency: "80+ Gold",
		modular: "Full",
	},
	{
		name: "Focus GX-850",
		manufacturer: "Seasonic",
		wattage: 850,
		efficiency: "80+ Gold",
		modular: "Full",
	},
	{
		name: "MWE Gold 650 V2",
		manufacturer: "Cooler Master",
		wattage: 650,
		efficiency: "80+ Gold",
		modular: "Full",
	},
	{
		name: "C750 Toughpower",
		manufacturer: "NZXT",
		wattage: 750,
		efficiency: "80+ Gold",
		modular: "Full",
	},
];

const seedDatabase = async () => {
	try {
		await CPU.insertMany(cpus);
		await GPU.insertMany(gpus);
		await RAM.insertMany(rams);
		await Storage.insertMany(storages);
		await Case.insertMany(cases);
		await Motherboard.insertMany(motherboards);
		await PSU.insertMany(psus);

		console.log("Database seeded successfully!");
	} catch (error) {
		console.error("Error seeding database:", error);
	}
};

seedDatabase();
