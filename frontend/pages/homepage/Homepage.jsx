import "./homepage.css";
import PCpic from "./gaming-pc.png";

export function Homepage() {
	return (
		<div className="hp-container">
			<div className="title-container">
				<div className="hp-title-text-container">
					<p className="hp-title top-title">Build Your</p>{" "}
					<p className="hp-title bottom-title"> Own PC</p>
				</div>
				<img src={PCpic} alt="computer picture" className="pc-pic" />
			</div>
			<div className="text-container">
				<p className="text">
					Create your own custom made personal computer with the components
					available in the database.
				</p>
			</div>
			<div className="button-container">
				<a href="/#/createpc" className="create-button">
					Start Creating
				</a>
			</div>
		</div>
	);
}
