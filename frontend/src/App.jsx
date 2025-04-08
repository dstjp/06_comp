import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
	const [data, setData] = useState();

	function createPost() {
		let partObject = {
			name: "Pelle",
			type: "Mustache",
		};

		axios.post("http://localhost:3000/parts", partObject);
	}

	/* useEffect(() => {
		async function fetchData() {
			const response = await axios.get("http://localhost:3000/parts");
			if (response.status === 200) {
				setData(response.data);
			}
		}
		fetchData();
	}, []); */

	return (
		<>
			<button onClick={createPost}>Create Part</button>
		</>
	);
}

export default App;
