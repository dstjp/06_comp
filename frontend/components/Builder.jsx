import { useState, useEffect } from "react";
import axios from "axios";

const URL = "http://localhost:3000/api";

export function Builder() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [saveBuild, setSaveBuild] = useState(false);
	const [buildName, setBuildName] = useState("My Custom PC");

	const [components, setComponents] = useState({
		CPU: [],
		GPU: [],
		RAM: [],
		Storage: [],
		Case: [],
		Motherboard: [],
		PowerSupply: [],
	});

	const [selectedComponents, setSelectedComponents] = useState({
		name: "",
		cpu: "",
		gpu: "",
		ram: "",
		storage: [],
		motherboard: "",
		case: "",
		powerSupply: "",
	});

	useEffect(() => {
		const fetchcomponents = async () => {
			try {
				setLoading(true);

				const response = await Promise.all([
					axios.get(`${URL}/component?componentType=CPU`),
					axios.get(`${URL}/component?componentType=GPU`),
					axios.get(`${URL}/component?componentType=RAM`),
					axios.get(`${URL}/component?componentType=Storage`),
					axios.get(`${URL}/component?componentType=Motherboard`),
					axios.get(`${URL}/component?componentType=Case`),
					axios.get(`${URL}/component?componentType=PowerSupply`),
				]);

				setComponents({
					CPU: response[0].data,
					CPU: response[1].data,
					CPU: response[2].data,
					CPU: response[3].data,
					CPU: response[4].data,
					CPU: response[5].data,
					CPU: response[6].data,
				});

				setLoading(false);
			} catch (error) {
				setError("Error fetching components");
				setLoading(false);
				console.error("Error fetching components", error);
			}
		};

		fetchcomponents();
	}, []);

	const handleComponentSelect = (type, componentId) => {
		if (!componentId) {
			setSelectedComponents((prev) => ({
				...prev,
				[type.toLowerCase()]: "",
			}));
			return;
		}

		const selectedComponent = components[type].find(
			(comp) => comp._id === componentId
		);
	};

	const savePCBuild = async () => {
		try {
			const buildData = {
				name: buildName,
				...selectedComponents,
			};

			Object.keys(buildData).forEach((key) => {
				if (
					!buildData[key] ||
					(Array.isArray(buildData[key]) && buildData[key].length === 0)
				) {
					delete buildData[key];
				}
			});

			const response = await axios.post(`${URL}/builds`, buildData);

			if (response.status === 201) {
				setBuildSaved(true);
				setTimeout(() => setBuildSaved(false), 3000); // Reset message after 3 seconds
			}
		} catch (error) {
			setError("Error saving PC build. Please try again.");
			console.error("Error saving build:", error);
		}
	};

	return <></>;
}
