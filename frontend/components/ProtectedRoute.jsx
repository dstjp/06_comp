import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function ProtectedRoute() {
	const { isAuthenticated, loading, authError } = useAuth();

	if (loading) {
		return (
			<div className="auth-loading-container">
				<p>Loading authentication...</p>
			</div>
		);
	}

	if (authError) {
		return (
			<div className="auth-error-container">
				<p>{authError}</p>
				<button onClick={() => (window.location.href = "/login")}>
					Back to Login
				</button>
			</div>
		);
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
}
