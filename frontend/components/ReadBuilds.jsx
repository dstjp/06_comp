import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";

const URL = "https://zero6-comp.onrender.com" || "/api";

export function ReadBuilds() {
	const { user, token } = useAuth();
	const [builds, setBuilds] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedBuild, setSelectedBuild] = useState(null);
	const [componentDetails, setComponentDetails] = useState(null);
	const [deleteStatus, setDeleteStatus] = useState(null);
	const [confirmDeleteId, setConfirmDeleteId] = useState(null);

	useEffect(() => {
		if (user && token) {
			fetchBuilds();
		} else if (token && !user) {
			setLoading(true);
		} else {
			setLoading(false);
			setError("Authentication required. Please log in.");
		}
	}, [user, token]);

	const fetchBuilds = async () => {
		try {
			const response = await axios.get(`${URL}/api/user/${user._id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setBuilds(response.data);
			setLoading(false);
		} catch (error) {
			setError("Error fetching PC builds");
			setLoading(false);
		}
		fetchBuilds();
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
			await axios.delete(`${URL}/${buildId}`);
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
			setDeleteStatus({ error: "Failed to delete build", buildId });
			setConfirmDeleteId(null);
			setTimeout(() => {
				setDeleteStatus(null);
			}, 3000);
		}
	};

	const renderComponent = (build, partType, part) => {
		if (!part) return null;

		return (
			<p
				onClick={() => showComponentDetails(partType, part)}
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
		return <strong className="component-label">{labels[type]}</strong>;
	};

	return (
		<div className="viewpc-container">
			<h3 className="viewpc-title">YOUR PCs</h3>

			{loading ? (
				<div className="rb-error-handling-container">
					<p className="rb-error-handling-message">Loading builds...</p>
				</div>
			) : error ? (
				<div className="rb-error-handling-container">
					<p className="rb-error-handling-message">{error}</p>
				</div>
			) : builds.length === 0 ? (
				<div className="rb-error-handling-container">
					<p className="rb-error-handling-message">No builds created yet</p>
				</div>
			) : (
				<div className="viewbuilds-container">
					<div className="viewbuilds-list">
						{builds.map((build) => (
							<div key={build._id} className="viewbuild-card">
								<h3 className="viewbuild-name">{build.name}</h3>
								<div className="viewbuild-grid">
									{renderComponent(build, "cpu", build.cpu)}
									{renderComponent(build, "gpu", build.gpu)}
									{renderComponent(build, "ram", build.ram)}
									{renderComponent(build, "storage", build.storage)}
									{renderComponent(build, "motherboard", build.motherboard)}
									{renderComponent(build, "psu", build.psu)}
									{renderComponent(build, "case", build.case)}
								</div>
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
									deleteStatus.error &&
									deleteStatus.buildId === build._id && (
										<p className="error-message">{deleteStatus.error}</p>
									)}
							</div>
						))}
					</div>

					{componentDetails && (
						<div className="component-details-panel">
							<p className="component-name-details">
								<strong className="component-name-details-highlight">
									{componentDetails.data.name}
								</strong>{" "}
								Specifications
							</p>
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

							<button
								className="specs-close-button"
								onClick={() => setComponentDetails(null)}
							>
								Close
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
