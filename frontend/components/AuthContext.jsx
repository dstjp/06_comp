import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
} from "react";

const AuthContext = createContext(null);

const URL = "https://zero6-comp.onrender.com";

export function AuthProvider({ children }) {
	const [token, setToken] = useState(sessionStorage.getItem("token"));
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [authError, setAuthError] = useState(null);

	useEffect(() => {
		if (token) {
			sessionStorage.setItem("token", token);
		} else {
			sessionStorage.removeItem("token");
		}
	}, [token]);

	const fetchUserProfile = useCallback(async () => {
		if (!token) {
			setLoading(false);
			return;
		}

		setLoading(true);
		try {
			const response = await fetch(`${URL}/users/profile`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				const userData = await response.json();
				setUser(userData);
				setAuthError(null);
			} else {
				console.error("Failed to authenticate, status:", response.status);

				if (response.status === 401 || response.status === 403) {
					setAuthError("Authentication expired. Please log in again.");
					logout();
				} else {
					setAuthError("Server error. Please try again later.");
				}
			}
		} catch (error) {
			console.error("Failed to fetch user profile:", error);
			setAuthError("Network error. Please check your connection.");
		} finally {
			setLoading(false);
		}
	}, [token]);

	useEffect(() => {
		fetchUserProfile();
	}, [fetchUserProfile]);

	const refreshUserProfile = () => {
		fetchUserProfile();
	};

	const login = (newToken) => {
		setToken(newToken);
		setAuthError(null);
	};

	const logout = () => {
		setToken(null);
		setUser(null);
		sessionStorage.removeItem("token");
	};

	const isTokenExpired = () => {
		if (!token) return true;

		return token.split(".").length !== 3;
	};

	const value = {
		token,
		user,
		login,
		logout,
		refreshUserProfile,
		isAuthenticated: !!token && !!user,
		loading,
		authError,
		isTokenExpired,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
