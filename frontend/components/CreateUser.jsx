import { useState } from "react";

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
			const response = await fetch("http://localhost:3000/api/users/register", {
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
		<div className="auth-form-container">
			<h2>Create Account</h2>
			{error && <p className="error-message">{error}</p>}
			{success && (
				<p className="success-message">
					Account created successfully! You can now log in.
				</p>
			)}

			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="username">Username</label>
					<input
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
					<label htmlFor="email">Email</label>
					<input
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

				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
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

				<button type="submit" className="submit-btn">
					Create Account
				</button>
			</form>
		</div>
	);
}
