import { useState, useEffect } from "react";
import axios from "axios";

const URL = "http://localhost:3000/api/build/builds";

export function ReadBuilds() {
	const [builds, setBuilds] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedBuild, setSelectedBuild] = useState(null);
	const [componentDetails, setComponentDetails] = useState(null);
	const [deleteStatus, setDeleteStatus] = useState(null);
	const [confirmDeleteId, setConfirmDeleteId] = useState(null);

	useEffect(() => {
		fetchBuilds();
	}, []);

	const fetchBuilds = async () => {
		try {
			setLoading(true);
			const response = await axios.get(`${URL}`);
			setBuilds(response.data);
			setLoading(false);
		} catch (error) {
			setError("Error fetching PC builds");
			setLoading(false);
			console.error("Error fetching builds:", error);
		}
	};

	const showComponentDetails = (partType, part) => {
		if (!part) return;

		setComponentDetails({
			type: partType,
			data: part,
		});
	};

	const initiateDelete = (buildId) => {
		setConfirmDeleteId(buildId);
	};

	const cancelDelete = () => {
		setConfirmDeleteId(null);
	};

	const confirmDelete = async (buildId) => {
		try {
			setDeleteStatus({ loading: true, buildId });
			await axios.delete(`http://localhost:3000/api/build/${buildId}`);
			setDeleteStatus({ success: true, buildId });

			setBuilds(builds.filter((build) => build._id !== buildId));

			if (selectedBuild && selectedBuild._id === buildId) {
				setSelectedBuild(null);
			}

			if (componentDetails && selectedBuild && selectedBuild._id === buildId) {
				setComponentDetails(null);
			}

			setConfirmDeleteId(null);

			setTimeout(() => {
				setDeleteStatus(null);
			}, 3000);
		} catch (error) {
			console.error("Could not delete build", error);
			setDeleteStatus({ error: "Failed to delete build", buildId });

			setConfirmDeleteId(null);

			setTimeout(() => {
				setDeleteStatus(null);
			}, 3000);
		}
	};

	/* const deleteBuild = async (buildId) => {
		try {
			setDeleteStatus({ loading: true, buildId });
			await axios.delete(`http://localhost:3000/api/build/${buildId}`);
			setDeleteStatus({ success: true, buildId });

			setBuilds(builds.filter((build) => build._id !== buildId));

			if (selectedBuild && selectedBuild._id === buildId) {
				setComponentDetails(null);
			}

			setTimeout(() => {
				setDeleteStatus(null);
			}, 3000);
		} catch (error) {
			console.error("Could not delete build", error);
			setDeleteStatus({ error: "failed to delete build", buildId });
			setTimeout(() => {
				setDeleteStatus(null);
			}, 3000);
		}
	}; */

	const renderComponent = (build, partType, part) => {
		if (!part) return null;

		return (
			<p
				onClick={() => showComponentDetails(partType, part)}
				style={{ cursor: "pointer" }}
				key={`${build._id}-${partType}`}
			>
				{getComponentLabel(partType)}: {part.name}
			</p>
		);
	};

	const getComponentLabel = (type) => {
		const labels = {
			cpu: "CPU",
			gpu: "GPU",
			ram: "RAM",
			storage: "Storage",
			motherboard: "Motherboard",
			psu: "PSU",
			case: "Case",
		};
		return labels[type] || type.toUpperCase();
	};

	return (
		<div className="container">
			<h3>Your PCs</h3>

			{loading ? (
				<p>Loading builds...</p>
			) : error ? (
				<p>{error}</p>
			) : builds.length === 0 ? (
				<p>No builds created yet.</p>
			) : (
				<div className="builds-container">
					<div className="builds-list">
						{builds.map((build) => (
							<div key={build._id} className="build-card">
								<h3>{build.name}</h3>

								{confirmDeleteId !== build._id && (
									<button
										onClick={() => initiateDelete(build._id)}
										className="delete-button"
										disabled={
											deleteStatus &&
											deleteStatus.loading &&
											deleteStatus.buildId === build._id
										}
									>
										{deleteStatus &&
										deleteStatus.loading &&
										deleteStatus.buildId === build._id
											? "Deleting..."
											: "Delete"}
									</button>
								)}

								{confirmDeleteId === build._id && (
									<div className="confirm-delete-options">
										<span className="confirm-text">Are you sure?</span>
										<button
											onClick={() => confirmDelete(build._id)}
											className="confirm-button"
										>
											Delete
										</button>
										<button onClick={cancelDelete} className="cancel-button">
											Cancel
										</button>
									</div>
								)}

								{deleteStatus &&
									deleteStatus.success &&
									deleteStatus.buildId === build._id && (
										<p className="success-message">
											Build deleted successfully!
										</p>
									)}

								{deleteStatus &&
									deleteStatus.error &&
									deleteStatus.buildId === build._id && (
										<p className="error-message">{deleteStatus.error}</p>
									)}

								{renderComponent(build, "cpu", build.cpu)}
								{renderComponent(build, "gpu", build.gpu)}
								{renderComponent(build, "ram", build.ram)}
								{renderComponent(build, "storage", build.storage)}
								{renderComponent(build, "motherboard", build.motherboard)}
								{renderComponent(build, "psu", build.psu)}
								{renderComponent(build, "case", build.case)}
							</div>
						))}
					</div>

					{componentDetails && (
						<div className="component-details-panel">
							<h4>{componentDetails.data.name} Details</h4>
							<div>
								{componentDetails.type === "cpu" &&
									componentDetails.data.manufacturer && (
										<p>
											<strong>Manufacturer:</strong>{" "}
											{componentDetails.data.manufacturer}
										</p>
									)}
								{componentDetails.type === "cpu" &&
									componentDetails.data.cores && (
										<p>
											<strong>Cores:</strong> {componentDetails.data.cores}
										</p>
									)}
								{componentDetails.type === "cpu" &&
									componentDetails.data.baseFrequency && (
										<p>
											<strong>Base Frequency:</strong>{" "}
											{componentDetails.data.baseFrequency}
										</p>
									)}
								{componentDetails.type === "cpu" &&
									componentDetails.data.tdp && (
										<p>
											<strong>TDP:</strong> {componentDetails.data.tdp}
										</p>
									)}

								{componentDetails.type === "gpu" &&
									componentDetails.data.manufacturer && (
										<p>
											<strong>Manufacturer:</strong>{" "}
											{componentDetails.data.manufacturer}
										</p>
									)}
								{componentDetails.type === "gpu" &&
									componentDetails.data.coreClock && (
										<p>
											<strong>CoreClock:</strong>{" "}
											{componentDetails.data.coreClock}
										</p>
									)}
								{componentDetails.type === "gpu" &&
									componentDetails.data.memory && (
										<p>
											<strong>Memory:</strong> {componentDetails.data.memory}
										</p>
									)}
								{componentDetails.type === "gpu" &&
									componentDetails.data.tdp && (
										<p>
											<strong>TDP:</strong> {componentDetails.data.tdp}
										</p>
									)}

								{componentDetails.type === "ram" &&
									componentDetails.data.manufacturer && (
										<p>
											<strong>Manufacturer:</strong>{" "}
											{componentDetails.data.manufacturer}
										</p>
									)}
								{componentDetails.type === "ram" &&
									componentDetails.data.capacity && (
										<p>
											<strong>Capacity:</strong>{" "}
											{componentDetails.data.capacity}
										</p>
									)}
								{componentDetails.type === "ram" &&
									componentDetails.data.speed && (
										<p>
											<strong>Speed:</strong> {componentDetails.data.speed}
										</p>
									)}
								{componentDetails.type === "ram" &&
									componentDetails.data.type && (
										<p>
											<strong>Type:</strong> {componentDetails.data.type}
										</p>
									)}
								{componentDetails.type === "ram" &&
									componentDetails.data.modules && (
										<p>
											<strong>Modules:</strong> {componentDetails.data.modules}
										</p>
									)}

								{componentDetails.type === "storage" &&
									componentDetails.data.manufacturer && (
										<p>
											<strong>Manufacturer:</strong>{" "}
											{componentDetails.data.manufacturer}
										</p>
									)}
								{componentDetails.type === "storage" &&
									componentDetails.data.capacity && (
										<p>
											<strong>Capacity:</strong>{" "}
											{componentDetails.data.capacity}
										</p>
									)}
								{componentDetails.type === "storage" &&
									componentDetails.data.type && (
										<p>
											<strong>Type:</strong> {componentDetails.data.type}
										</p>
									)}
								{componentDetails.type === "storage" &&
									componentDetails.data.interface && (
										<p>
											<strong>Interface:</strong>{" "}
											{componentDetails.data.interface}
										</p>
									)}

								{componentDetails.type === "motherboard" &&
									componentDetails.data.manufacturer && (
										<p>
											<strong>Manufacturer:</strong>{" "}
											{componentDetails.data.manufacturer}
										</p>
									)}
								{componentDetails.type === "motherboard" &&
									componentDetails.data.socket && (
										<p>
											<strong>Socket:</strong> {componentDetails.data.socket}
										</p>
									)}
								{componentDetails.type === "motherboard" &&
									componentDetails.data.memorySlots && (
										<p>
											<strong>Memory Slots:</strong>{" "}
											{componentDetails.data.memorySlots}
										</p>
									)}
								{componentDetails.type === "motherboard" &&
									componentDetails.data.chipset && (
										<p>
											<strong>Chipset:</strong> {componentDetails.data.chipset}
										</p>
									)}
								{componentDetails.type === "motherboard" &&
									componentDetails.data.maxMemory && (
										<p>
											<strong>Max Memory:</strong>{" "}
											{componentDetails.data.maxMemory}
										</p>
									)}

								{componentDetails.type === "psu" &&
									componentDetails.data.manufacturer && (
										<p>
											<strong>Manufacturer:</strong>{" "}
											{componentDetails.data.manufacturer}
										</p>
									)}
								{componentDetails.type === "psu" &&
									componentDetails.data.wattage && (
										<p>
											<strong>Wattage:</strong> {componentDetails.data.wattage}
										</p>
									)}
								{componentDetails.type === "psu" &&
									componentDetails.data.efficiency && (
										<p>
											<strong>Efficiency:</strong>{" "}
											{componentDetails.data.efficiency}
										</p>
									)}
								{componentDetails.type === "psu" &&
									componentDetails.data.modular && (
										<p>
											<strong>Modular:</strong> {componentDetails.data.modular}
										</p>
									)}

								{componentDetails.type === "case" &&
									componentDetails.data.manufacturer && (
										<p>
											<strong>Manufacturer:</strong>{" "}
											{componentDetails.data.manufacturer}
										</p>
									)}
								{componentDetails.type === "case" &&
									componentDetails.data.color && (
										<p>
											<strong>Color:</strong> {componentDetails.data.color}
										</p>
									)}
								{componentDetails.type === "case" &&
									componentDetails.data.dimensions && (
										<p>
											<strong>Dimensions:</strong>{" "}
											{componentDetails.data.dimensions}
										</p>
									)}
								{componentDetails.type === "case" &&
									componentDetails.data.weight && (
										<p>
											<strong>Weight:</strong> {componentDetails.data.weight}
										</p>
									)}
							</div>
							<button onClick={() => setComponentDetails(null)}>Close</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
