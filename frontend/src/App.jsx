import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Homepage } from "../pages/homepage/Homepage";
import { CreateBuilds } from "../pages/createpc/CreateBuilds";
import { ViewBuilds } from "../pages/viewpc/ViewBuilds";
import { Layout } from "../components/Layout";

function App() {
	return (
		<Router>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<Homepage />} />
					<Route path="/createpc" element={<CreateBuilds />} />
					<Route path="/viewpc/" element={<ViewBuilds />} />
				</Route>
			</Routes>
		</Router>
	);
}
export default App;

/* function createPost() {
		let partObject = {
			name: "Pelle",
			type: "Mustache",
		};

		axios.post("http://localhost:3000/parts", partObject);
	} */

/* useEffect(() => {
		async function fetchData() {
			const response = await axios.get("http://localhost:3000/parts");
			if (response.status === 200) {
				setData(response.data);
			}
		}
		fetchData();
	}, []); */

/* useEffect(() => {
		async function loadAllParts() {
			let data = await getParts();
			if (data) {
				setParts(data);
			}
		}
		loadAllParts();
	}, []); */

/* function makePart() {
		let partObject = {
			name: "Musse",
			type: "Schnusse",
		};
		createPart(partObject);
	} */
