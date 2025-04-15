import "./homepage.css";

export function Homepage() {
	return (
		<div className="container">
			<div className="title-container">
				<p className="title top-title">Build Your</p>{" "}
				<p className="title bottom-title"> Own PC</p>
			</div>
			<div className="button-container">
				<button className="create-button">Start Creating</button>
			</div>
		</div>
	);
}
