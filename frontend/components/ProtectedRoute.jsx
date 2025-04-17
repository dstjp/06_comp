import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
	const isAuthenticated = !!sessionStorage.getItem("token");

	if (!isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
}
