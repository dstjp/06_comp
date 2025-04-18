const { Component } = require("../models/component");

//Retrieve all parts
exports.getComponents = async (request, response) => {
	try {
		const { partType, manufacturer } = request.query;

		const query = {};
		if (partType) query.componentType = componentType;
		if (manufacturer) query.manufacturer = manufacturer;

		const parts = await Component.find(query);
		response.status(200).json(parts);
	} catch (error) {
		response
			.status(500)
			.json({ message: "Error retrieving parts", error: error.message });
	}
};

//Retrieve one Part (by ID)
exports.getComponentById = async (request, response) => {
	try {
		const part = await Component.findById(request.params.id);

		if (!part) {
			return response.status(404).json({ message: "Part not found" });
		}

		response.status(200).json(part);
	} catch (error) {
		response
			.status(500)
			.json({ message: "Error retrieving parts", error: error.message });
	}
};
