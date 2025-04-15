import { Navbar } from "./navbar/Navbar";
import { Outlet } from "react-router-dom";

export function Layout() {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
}
