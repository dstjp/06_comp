import { createPart } from "../src/api";

export function CreateBuilds() {
	function makePart() {
		let partObject = {
			name: "Pelle",
			type: "Mustache",
		};

		makePart(partObject);
	}

	return (
		<div>
			<h3>Create your PC page</h3>
			<button onClick={makePart}>Create Build</button>
		</div>
	);
}
