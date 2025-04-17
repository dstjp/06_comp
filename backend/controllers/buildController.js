const Build = require("../models/build");
const User = require("../models/user");
const { Component } = require("../models/part");

exports.createBuild = async (request, response) => {
	try {
		const {
			name,
			cpu,
			gpu,
			ram,
			storage,
			motherboard,
			case: compCase,
			psu,
			userId,
		} = request.body;

		const parts = await Component.find({
			_id: {
				$in: [cpu, gpu, ram, storage, motherboard, compCase, psu].filter(
					(id) => id
				),
			},
		});

		const checkParts = [cpu, gpu, ram, motherboard, compCase, psu].filter(
			(id) => id
		);

		const foundIds = parts.map((c) => c._id.toString());
		const missingParts = checkParts.filter(
			(id) => !foundIds.includes(id.toString())
		);

		if (missingParts.length > 0) {
			return response
				.status(400)
				.json({ message: "Certain parts are not available", missingParts });
		}

		const pcBuild = new Build({
			name,
			user: userId,
			cpu,
			gpu,
			ram,
			storage,
			motherboard,
			case: compCase,
			psu,
		});

		const saveBuild = await pcBuild.save();

		if (userId) {
			await User.findByIdAndUpdate(userId, {
				$push: { builds: saveBuild._id },
			});
		}

		await saveBuild.populate([
			{ path: "cpu" },
			{ path: "gpu" },
			{ path: "ram" },
			{ path: "storage" },
			{ path: "motherboard" },
			{ path: "case" },
			{ path: "psu" },
		]);
		response.status(201).json(saveBuild);
	} catch (error) {
		response.status(500).json({
			message: "Server Error creating PC build",
			error: error.message,
		});
	}
};

//Retrieve PC Build (by ID)
exports.getBuildById = async (request, response) => {
	try {
		const pcBuild = await Build.findById(request.params.id).populate(
			"cpu gpu ram storage motherboard case psu user"
		);

		if (!pcBuild) {
			return response
				.status(404)
				.json({ message: "PC Build could not be found" });
		}
		response.status(200).json(pcBuild);
	} catch (error) {
		response.status(500).json({
			message: "Server Error fetching PC build",
			error: error.message,
		});
	}
};

//Retrieve all builds
exports.getBuild = async (request, response) => {
	try {
		const builds = request.params.data;
		const pcBuild = await Build.find(builds).populate(
			"cpu gpu ram storage motherboard case psu"
		);

		if (!pcBuild) {
			return response
				.status(404)
				.json({ message: "PC Build could not be found" });
		}
		response.status(200).json(pcBuild);
	} catch (error) {
		response.status(500).json({
			message: "Server Error fetching PC build",
			error: error.message,
		});
	}
};

//Get all builds for a user
exports.getUserBuilds = async (request, response) => {
	try {
		const userId = request.params.userId;
		const builds = await Build.find({ user: userId }).populate(
			"cpu gpu ram storage motherboard case psu"
		);

		response.status(200).json(builds);
	} catch (error) {
		response.status(500).json({
			message: "Server Error fetching PC build",
			error: error.message,
		});
	}
};

//Update PC Build
exports.updateBuild = async (request, response) => {
	try {
		const {
			name,
			cpu,
			gpu,
			ram,
			storage,
			motherboard,
			case: compCase,
			psu,
			userId,
		} = request.body;

		const checkParts = [];

		if (cpu) checkParts.push(cpu);
		if (gpu) checkParts.push(gpu);
		if (ram) checkParts.push(ram);
		if (motherboard) checkParts.push(motherboard);
		if (psu) checkParts.push(psu);
		if (compCase) checkParts.push(compCase);

		if (checkParts.length > 0) {
			const parts = await Component.find({ _id: { $in: checkParts } });

			const foundIds = parts.map((c) => c._id.toString());
			const missingParts = checkParts.filter(
				(id) => !foundIds.includes(id.toString())
			);

			if (missingParts.length > 0) {
				return response.status(400).json({
					message: "Certain parts not available",
					missingParts,
				});
			}
		}

		const updateBuild = await Build.findByIdAndUpdate(
			request.params.id,
			{
				name,
				cpu,
				gpu,
				ram,
				storage: Array.isArray(storage)
					? storage
					: storage
					? [storage]
					: undefined,
				motherboard,
				case: compCase,
				psu,
				updatedAt: Date.now(),
			},
			{
				new: true,
				runValidators: true,
			}
		).populate("cpu gpu ram storage motherboard case psu");

		if (!updateBuild) {
			return response.status(400).json({ message: "PC build cannot be found" });
		}
		response.status(200).json(updateBuild);
	} catch (error) {
		response.status(500).json({
			message: "Server Error updating the PC build",
			error: error.message,
		});
	}
};

//Delete PC build (by ID)
exports.deleteBuild = async (request, response) => {
	try {
		const pcBuild = await Build.findById(request.params.id);

		if (!pcBuild) {
			return response.status(404).json({ message: "PC build cannot be found" });
		}

		if (pcBuild.user) {
			await User.findByIdAndUpdate(pcBuild.user, {
				$pull: { builds: pcBuild._id },
			});
		}

		await Build.findByIdAndDelete(request.params.id);

		response.status(200).json({ message: "PC build deleted" });
	} catch (error) {
		response.status(500).json({
			message: "Server Error deleting the PC build",
			error: error.message,
		});
	}
};
