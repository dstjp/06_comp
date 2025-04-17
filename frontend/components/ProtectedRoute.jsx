import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
	const isAuthenticated = !!sessionStorage.getItem("token");

	if (!isAuthenticated) {
		// Redirect to login page if not authenticated
		return <Navigate to="/" replace />;
	}

	// If authenticated, render the child routes
	return <Outlet />;
}
