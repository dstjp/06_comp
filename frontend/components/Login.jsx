import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const URL = import.meta.env.VITE_API_URL || "/api";

export function Login() {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();
	const { login } = useAuth();

	function handleChange(e) {
		const { name, value } = e.target;
		setUser((user) => ({
			...user,
			[name]: value,
		}));
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			const response = await fetch(`${URL}/users/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});

			//error handling

			const contentType = response.headers.get("content-type");

			if (contentType && contentType.includes("application/json")) {
				data = await response.json();
			} else {
				const text = await response.text();
				throw new Error(`Server error: ${text}`);
			}

			const data = await response.json();

			if (response.ok) {
				login(data.token);
				navigate("/home");
			} else {
				throw new Error(data.message || "Login failed");
			}
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="login-container">
			<h2 className="login-title">Login</h2>
			{error && <p className="login-error-message">{error}</p>}

			<form className="login-form-container" onSubmit={handleSubmit}>
				<div className="login-form">
					<label className="login-label" htmlFor="login-email"></label>
					<input
						className="email-input login-input"
						type="email"
						id="login-email"
						name="email"
						value={user.email}
						onChange={handleChange}
						placeholder="Email"
						required
					/>
				</div>

				<div className="login-form">
					<label className="login-label" htmlFor="login-password"></label>
					<input
						className="login-input"
						type="password"
						id="login-password"
						name="password"
						value={user.password}
						onChange={handleChange}
						placeholder="Password"
						required
					/>
				</div>
				<button
					type="submit"
					className="login-submit-button"
					disabled={isLoading}
				>
					{isLoading ? "Logging in..." : "Login"}
				</button>
			</form>
		</div>
	);
}
