import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Homepage } from "../pages/homepage/Homepage";
import { Landingpage } from "../pages/landingpage/Landingpage";
import { CreateBuilds } from "../pages/createpc/CreateBuilds";
import { ViewBuilds } from "../pages/viewpc/ViewBuilds";
import { Layout } from "../components/Layout";
import { ProtectedRoute } from "../components/ProtectedRoute";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Landingpage />} />
				<Route element={<ProtectedRoute />}>
					<Route element={<Layout />}>
						<Route path="/home" element={<Homepage />} />
						<Route path="/createpc" element={<CreateBuilds />} />
						<Route path="/viewpc" element={<ViewBuilds />} />
					</Route>
				</Route>
			</Routes>
		</Router>
	);
}
export default App;
