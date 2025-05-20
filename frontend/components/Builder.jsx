import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";

const URL = import.meta.env.VITE_API_URL || "/api";

export function Builder() {
	const { user, token } = useAuth();
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

				const response = await axios.get(`${URL}/component`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
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

	const savePCBuild = async () => {
		try {
			const buildData = {
				name: buildName,
				userId: user._id,
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

			const response = await axios.post(`${URL}/build`, buildData, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`, // Add authentication header
				},
			});

			if (response.status === 201) {
				setSaveBuild(true);
				setError(null);

				setTimeout(() => {
					setSaveBuild(false);
				}, 3000);
			}
		} catch (error) {
			setError("Error saving PC build. Please try again.");
		}
	};

	return (
		<div className="buildpc-container">
			<p className="buildpc-title">Build Your PC</p>

			<div className="build-name-container">
				<label className="build-name" htmlFor="buildName">
					Build Name
				</label>
				<input
					className="user-build-name"
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
				<div className="component-container">
					<div className="cpu-container">
						<label className="component-name" htmlFor="cpu">
							CPU
						</label>
						<select
							className="select-list"
							name="cpu"
							id="cpu"
							value={selectedComponents.cpu}
							onChange={(e) => handleComponentSelect("CPU", e.target.value)}
						>
							<option value=""></option>
							{components.CPU &&
								components.CPU.map((cpu) => (
									<option key={cpu._id} value={cpu._id}>
										{cpu.name}
									</option>
								))}
						</select>
					</div>

					<div className="gpu-container">
						<label className="component-name" htmlFor="gpu">
							GPU
						</label>
						<select
							className="select-list"
							name="gpu"
							id="gpu"
							value={selectedComponents.gpu}
							onChange={(e) => handleComponentSelect("GPU", e.target.value)}
						>
							<option value=""></option>
							{components.GPU &&
								components.GPU.map((gpu) => (
									<option key={gpu._id} value={gpu._id}>
										{gpu.name}
									</option>
								))}
						</select>
					</div>

					<div className="ram-container">
						<label className="component-name" htmlFor="ram">
							RAM
						</label>
						<select
							className="select-list"
							name="ram"
							id="ram"
							value={selectedComponents.ram}
							onChange={(e) => handleComponentSelect("RAM", e.target.value)}
						>
							<option value=""></option>
							{components.RAM &&
								components.RAM.map((ram) => (
									<option key={ram._id} value={ram._id}>
										{ram.name}
									</option>
								))}
						</select>
					</div>

					<div className="storage-container">
						<label className="component-name" htmlFor="storage">
							Storage
						</label>
						<select
							className="select-list"
							name="storage"
							id="storage"
							value={selectedComponents.storage}
							onChange={(e) => handleComponentSelect("Storage", e.target.value)}
						>
							<option value=""></option>
							{components.Storage &&
								components.Storage.map((storage) => (
									<option key={storage._id} value={storage._id}>
										{storage.name}
									</option>
								))}
						</select>
					</div>

					<div className="motherboard-container">
						<label className="component-name" htmlFor="motherboard">
							Motherboard
						</label>
						<select
							className="select-list"
							name="motherboard"
							id="motherboard"
							value={selectedComponents.motherboard}
							onChange={(e) =>
								handleComponentSelect("Motherboard", e.target.value)
							}
						>
							<option value=""></option>
							{components.Motherboard &&
								components.Motherboard.map((mobo) => (
									<option key={mobo._id} value={mobo._id}>
										{mobo.name}
									</option>
								))}
						</select>
					</div>

					<div className="powersupply-container">
						<label className="component-name" htmlFor="powersupply">
							Power Supply
						</label>
						<select
							className="select-list"
							name="powersupply"
							id="powersupply"
							value={selectedComponents.psu}
							onChange={(e) => handleComponentSelect("PSU", e.target.value)}
						>
							<option value=""></option>
							{components.PSU &&
								components.PSU.map((psu) => (
									<option key={psu._id} value={psu._id}>
										{psu.name}
									</option>
								))}
						</select>

						<div className="case-container">
							<label className="component-name" htmlFor="case">
								Case
							</label>
							<select
								className="select-list"
								name="case"
								id="case"
								value={selectedComponents.case}
								onChange={(e) => handleComponentSelect("Case", e.target.value)}
							>
								<option value=""></option>
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

			<div className="save-button-container">
				<button
					onClick={savePCBuild}
					disabled={
						loading ||
						!selectedComponents.cpu ||
						!selectedComponents.gpu ||
						!selectedComponents.ram ||
						!selectedComponents.motherboard ||
						!selectedComponents.storage ||
						!selectedComponents.psu ||
						!selectedComponents.case
					}
					className="save-button"
				>
					Save PC Build
				</button>

				{saveBuild && (
					<p className="create-success-message">Build saved successfully!</p>
				)}
			</div>
		</div>
	);
}
