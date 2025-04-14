import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
		Motherboard: [],
		PSU: [],
		Case: [],
	});

	const [selectedComponents, setSelectedComponents] = useState({
		name: "",
		cpu: "",
		gpu: "",
		ram: "",
		storage: "",
		motherboard: "",
		psu: "",
		case: "",
	});

	useEffect(() => {
		const fetchComponents = async () => {
			try {
				setLoading(true);

				const response = await axios.get(`${URL}/component`);
				const allComponents = response.data;

				const categorizedComponents = {
					CPU: allComponents.filter((comp) => comp.partType === "CPU"),
					GPU: allComponents.filter((comp) => comp.partType === "GPU"),
					RAM: allComponents.filter((comp) => comp.partType === "RAM"),
					Storage: allComponents.filter((comp) => comp.partType === "Storage"),
					Motherboard: allComponents.filter(
						(comp) => comp.partType === "Motherboard"
					),
					PSU: allComponents.filter((comp) => comp.partType === "PSU"),
					Case: allComponents.filter((comp) => comp.partType === "Case"),
				};

				setComponents(categorizedComponents);
				setLoading(false);
			} catch (error) {
				setError("Error fetching components");
				setLoading(false);
				console.error("Error fetching components", error);
			}
		};

		fetchComponents();
	}, []);

	const handleComponentSelect = (type, componentId) => {
		if (!componentId) {
			setSelectedComponents((prev) => ({
				...prev,
				[type.toLowerCase()]: "",
			}));
			return;
		}
		setSelectedComponents((prev) => ({
			...prev,
			[type.toLowerCase()]: componentId,
		}));

		const selectedComponent = components[type].find(
			(comp) => comp._id === componentId
		);
		if (selectedComponent) {
			setSelectedComponents((prev) => ({
				...prev,
				[type.toLowerCase()]: componentId,
			}));
		}
	};

	const navigate = useNavigate();

	const savePCBuild = async () => {
		try {
			if (!selectedComponents.cpu || !selectedComponents.motherboard) {
				setError("CPU and Motherboard are required for your build.");
			}
			const buildData = {
				name: buildName,
				cpu: selectedComponents.cpu,
				gpu: selectedComponents.gpu,
				ram: selectedComponents.ram,
				storage: selectedComponents.storage,
				motherboard: selectedComponents.motherboard,
				case: selectedComponents.case,
				psu: selectedComponents.psu,
			};

			Object.keys(buildData).forEach((key) => {
				if (
					!buildData[key] ||
					(Array.isArray(buildData[key]) && buildData[key].length === 0)
				) {
					delete buildData[key];
				}
			});

			console.log("Saving build:", buildData);

			const response = await axios.post(`${URL}/build`, buildData);

			if (response.status === 201) {
				setSaveBuild(true);
				setError(null);

				setTimeout(() => {
					setSaveBuild(false);
					navigate("/build");
				}, 3000);
			}
		} catch (error) {
			setError("Error saving PC build. Please try again.");
			console.error(
				"Error saving build:",
				error.response?.data || error.message
			);
		}
	};

	return (
		<div className="container">
			<h3>PC Builder</h3>

			<div className="build-name-container">
				<label htmlFor="buildName">Build Name</label>
				<input
					type="text"
					id="buildName"
					value={buildName}
					onChange={(e) => setBuildName(e.target.value)}
					placeholder="Enter a name for your build"
				/>
			</div>

			{loading ? (
				<p>Loading components...</p>
			) : error ? (
				<p className="error">{error}</p>
			) : (
				<div className="grid">
					<div className="cpu-container">
						<label htmlFor="cpu">CPU</label>
						<select
							name="cpu"
							id="cpu"
							value={selectedComponents.cpu}
							onChange={(e) => handleComponentSelect("CPU", e.target.value)}
						>
							<option value="">Select CPU</option>
							{components.CPU &&
								components.CPU.map((cpu) => (
									<option key={cpu._id} value={cpu._id}>
										{cpu.name}
									</option>
								))}
						</select>
					</div>

					<div className="gpu-container">
						<label htmlFor="gpu">GPU</label>
						<select
							name="gpu"
							id="gpu"
							value={selectedComponents.gpu}
							onChange={(e) => handleComponentSelect("GPU", e.target.value)}
						>
							<option value="">Select GPU</option>
							{components.GPU &&
								components.GPU.map((gpu) => (
									<option key={gpu._id} value={gpu._id}>
										{gpu.name}
									</option>
								))}
						</select>
					</div>

					<div className="ram-container">
						<label htmlFor="ram">RAM</label>
						<select
							name="ram"
							id="ram"
							value={selectedComponents.ram}
							onChange={(e) => handleComponentSelect("RAM", e.target.value)}
						>
							<option value="">Select RAM</option>
							{components.RAM &&
								components.RAM.map((ram) => (
									<option key={ram._id} value={ram._id}>
										{ram.name}
									</option>
								))}
						</select>
					</div>

					<div className="storage-container">
						<label htmlFor="storage">Storage</label>
						<select
							name="storage"
							id="storage"
							value={selectedComponents.storage[0] || ""}
							onChange={(e) => {
								if (e.target.value) {
									setSelectedComponents((prev) => ({
										...prev,
										storage: [e.target.value],
									}));
								}
							}}
						>
							<option value="">Select Storage</option>
							{components.Storage &&
								components.Storage.map((storage) => (
									<option key={storage._id} value={storage._id}>
										{storage.name}
									</option>
								))}
						</select>
					</div>

					<div className="motherboard-container">
						<label htmlFor="motherboard">Motherboard</label>
						<select
							name="motherboard"
							id="motherboard"
							value={selectedComponents.motherboard}
							onChange={(e) =>
								handleComponentSelect("Motherboard", e.target.value)
							}
						>
							<option value="">Select Motherboard</option>
							{components.Motherboard &&
								components.Motherboard.map((mobo) => (
									<option key={mobo._id} value={mobo._id}>
										{mobo.name}
									</option>
								))}
						</select>
					</div>

					<div className="powersupply-container">
						<label htmlFor="powersupply">Power Supply</label>
						<select
							name="powersupply"
							id="powersupply"
							value={selectedComponents.psu}
							onChange={(e) => handleComponentSelect("PSU", e.target.value)}
						>
							<option value="">Select PSU</option>
							{components.PSU &&
								components.PSU.map((psu) => (
									<option key={psu._id} value={psu._id}>
										{psu.name}
									</option>
								))}
						</select>

						<div className="case-container">
							<label htmlFor="case">Case</label>
							<select
								name="case"
								id="case"
								value={selectedComponents.case}
								onChange={(e) => handleComponentSelect("Case", e.target.value)}
							>
								<option value="">Select Case</option>
								{components.Case &&
									components.Case.map((caseItem) => (
										<option key={caseItem._id} value={caseItem._id}>
											{caseItem.name}
										</option>
									))}
							</select>
						</div>
					</div>
				</div>
			)}

			<div className="actions">
				<button
					onClick={savePCBuild}
					disabled={
						loading ||
						!selectedComponents.cpu ||
						!selectedComponents.motherboard
					}
					className="save-button"
				>
					Save PC Build
				</button>

				{saveBuild && (
					<p className="success-message">Build saved successfully!</p>
				)}
				{error && <p className="error-message">{error}</p>}
			</div>
		</div>
	);
}
