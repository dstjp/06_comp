import { useState, useEffect } from "react";
import axios from "axios";

const URL = "http://localhost:3000/api/build/builds";

export function ReadBuilds() {
	const [builds, setBuilds] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedBuild, setSelectedBuild] = useState(null);

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

	const viewBuildDetails = (buildId) => {
		const build = builds.find((b) => b._id === buildId);
		setSelectedBuild(build);
	};

	return (
		<div className="build-container">
			<h3>Your PCs</h3>

			<div className="build-list">
				{builds.map((build) => (
					<div key={build._id}>
						<h4>{build.name}</h4>
						<div>{build.cpu && `CPU: ${build.cpu.name}`}</div>
						<p>{build.gpu && `GPU: ${build.gpu.name}`}</p>
						<p>{build.ram && `RAM: ${build.ram.name}`}</p>
						<p>{build.storage && `Storage: ${build.storage.name}`}</p>
						<p>
							{build.motherboard && `Motherboard: ${build.motherboard.name}`}
						</p>
						<p>{build.psu && `PSU: ${build.psu.name}`}</p>
						<p>{build.case && `Case: ${build.case.name}`}</p>
					</div>
				))}
			</div>
		</div>
	);
}

{
	/* <div className="container">
			<h3>Your Custom PC Builds</h3>

			{loading ? (
				<p>Loading your builds...</p>
			) : error ? (
				<p className="error">{error}</p>
			) : builds.length === 0 ? (
				<div className="no-builds">
					<p>You haven't created any PC builds yet.</p>
					<a href="/builder" className="create-build-link">
						Create your first build
					</a>
				</div>
			) : (
				<div className="builds-container">
					<div className="builds-list">
						{builds.map((build) => (
							<div
								key={build._id}
								className={`build-card ${
									selectedBuild && selectedBuild._id === build._id
										? "selected"
										: ""
								}`}
								onClick={() => viewBuildDetails(build._id)}
							>
								<h4>{build.name}</h4>
								<p className="build-preview">
									{build.cpu && `CPU: ${build.cpu.name}`}
									{build.gpu && `, GPU: ${build.gpu.name}`}
								</p>
							</div>
						))}
					</div>

					{selectedBuild && (
						<div className="build-details">
							<h4>{selectedBuild.name}</h4>
							<div className="component-list">
								{selectedBuild.cpu && (
									<div className="component-item">
										<span className="component-type">CPU:</span>
										<span className="component-name">
											{selectedBuild.cpu.name}
										</span>
									</div>
								)}
								{selectedBuild.gpu && (
									<div className="component-item">
										<span className="component-type">GPU:</span>
										<span className="component-name">
											{selectedBuild.gpu.name}
										</span>
									</div>
								)}
								{selectedBuild.ram && (
									<div className="component-item">
										<span className="component-type">RAM:</span>
										<span className="component-name">
											{selectedBuild.ram.name}
										</span>
									</div>
								)}
								{selectedBuild.storage && (
									<div className="component-item">
										<span className="component-type">Storage:</span>
										<span className="component-name">
											{selectedBuild.storage.name}
										</span>
									</div>
								)}
								{selectedBuild.motherboard && (
									<div className="component-item">
										<span className="component-type">Motherboard:</span>
										<span className="component-name">
											{selectedBuild.motherboard.name}
										</span>
									</div>
								)}
								{selectedBuild.psu && (
									<div className="component-item">
										<span className="component-type">Power Supply:</span>
										<span className="component-name">
											{selectedBuild.psu.name}
										</span>
									</div>
								)}
								{selectedBuild.case && (
									<div className="component-item">
										<span className="component-type">Case:</span>
										<span className="component-name">
											{selectedBuild.case.name}
										</span>
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			)}

			<div className="actions">
				<button onClick={fetchBuilds} className="refresh-button">
					Refresh Builds
				</button>
			</div>
		</div>
	); */
}
