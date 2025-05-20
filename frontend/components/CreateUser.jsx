import { useState } from "react";

const URL = "https://zero6-comp.onrender.com" || "/api";

export function CreateUser() {
	const [user, setUser] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

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

		try {
			const response = await fetch(`${URL}/users/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Could not create account");
			}

			setSuccess(true);
		} catch (error) {
			setError(error.message);
		}
	}

	return (
		<div className="login-container">
			<h2 className="login-title">Create Account</h2>
			{error && <p className="error-message">{error}</p>}
			{success && (
				<p className="ca-success-message">
					Account created successfully! You can now log in.
				</p>
			)}

			<form className="login-form-container" onSubmit={handleSubmit}>
				<div className="login-form">
					<input
						className="username-input login-input"
						type="text"
						id="username"
						name="username"
						maxLength={20}
						value={user.username}
						onChange={handleChange}
						placeholder="Username"
						required
					/>
				</div>

				<div className="form-group">
					<input
						className="login-input"
						type="email"
						id="email"
						name="email"
						maxLength={40}
						value={user.email}
						onChange={handleChange}
						placeholder="Email"
						required
					/>
				</div>

				<div className="login-form">
					<input
						className="login-input"
						type="password"
						id="password"
						name="password"
						maxLength={20}
						value={user.password}
						onChange={handleChange}
						placeholder="Password"
						required
					/>
				</div>

				<button type="submit" className="login-submit-button">
					Create Account
				</button>
			</form>
		</div>
	);
}
