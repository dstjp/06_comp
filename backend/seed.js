/* const {
	CPU,
	GPU,
	RAM,
	Storage,
	Case,
	Motherboard,
	PowerSupply,
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
		price: 229.99,
		inStock: true,
		cores: 6,
		baseFrequency: "3.7 GHz",
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
];

const powerSupplies = [
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
];

const seedDatabase = async () => {
	try {
		await CPU.insertMany(cpus);
		await GPU.insertMany(gpus);
		await RAM.insertMany(rams);
		await Storage.insertMany(storages);
		await Case.insertMany(cases);
		await Motherboard.insertMany(motherboards);
		await PowerSupply.insertMany(powerSupplies);

		console.log("Database seeded successfully!");
	} catch (error) {
		console.error("Error seeding database:", error);
	}
};

seedDatabase();
 */
