import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const URL = "https://zero6-comp.onrender.com";

export function AuthProvider({ children }) {
	const [token, setToken] = useState(sessionStorage.getItem("token"));
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (token) {
			sessionStorage.setItem("token", token);
		} else {
			sessionStorage.removeItem("token");
		}
	}, [token]);

	useEffect(() => {
		if (token) {
			fetchUserProfile();
		} else {
			setLoading(false);
		}
	}, [token]);

	const fetchUserProfile = async () => {
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
			} else {
				console.error("Invalid token or unauthorized");
				logout();
			}
		} catch (error) {
			console.error("Failed to fetch user profile:", error);
			logout();
		} finally {
			setLoading(false);
		}
	};

	const login = (newToken) => {
		setToken(newToken);
	};

	const logout = () => {
		setToken(null);
		setUser(null);
		sessionStorage.removeItem("token");
	};

	const value = {
		token,
		user,
		login,
		logout,
		isAuthenticated: !!token,
		loading,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
