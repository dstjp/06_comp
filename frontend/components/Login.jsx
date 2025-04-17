import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

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
			const response = await fetch("http://localhost:3000/api/users/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});

			const data = await response.json();

			if (response.ok) {
				login(data.token);
				navigate("/home");
			} else {
				throw new Error(data.message || "Login failed");
			}
		} catch (err) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="auth-form-container">
			<h2>Login</h2>
			{error && <p className="error-message">{error}</p>}

			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="login-email">Email</label>
					<input
						type="email"
						id="login-email"
						name="email"
						value={user.email}
						onChange={handleChange}
						placeholder="Email"
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="login-password">Password</label>
					<input
						type="password"
						id="login-password"
						name="password"
						value={user.password}
						onChange={handleChange}
						placeholder="Password"
						required
					/>
				</div>

				<button type="submit" className="submit-btn" disabled={isLoading}>
					{isLoading ? "Logging in..." : "Login"}
				</button>
			</form>
		</div>
	);
}
