import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const URL = "https://zero6-comp.onrender.com";

export function AuthProvider({ children }) {
	const [token, setToken] = useState(sessionStorage.getItem("token"));
	const [user, setUser] = useState(null);

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
		}
	}, [token]);

	const fetchUserProfile = async () => {
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
