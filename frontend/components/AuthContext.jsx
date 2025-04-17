import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [token, setToken] = useState(sessionStorage.getItem("token"));
	const [user, setUser] = useState(null);

	// Update token in session storage when it changes
	useEffect(() => {
		if (token) {
			sessionStorage.setItem("token", token);
		} else {
			sessionStorage.removeItem("token");
		}
	}, [token]);

	// Fetch user profile when token is available
	useEffect(() => {
		if (token) {
			fetchUserProfile();
		}
	}, [token]);

	const fetchUserProfile = async () => {
		try {
			const response = await fetch("http://localhost:3000/api/users/profile", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				const userData = await response.json();
				setUser(userData);
			} else {
				// Token might be invalid
				logout();
			}
		} catch (error) {
			console.error("Failed to fetch user profile:", error);
		}
	};

	const login = (newToken) => {
		setToken(newToken);
	};

	const logout = () => {
		setToken(null);
		setUser(null);
	};

	const value = {
		token,
		user,
		login,
		logout,
		isAuthenticated: !!token,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
