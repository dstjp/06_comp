import { CreateUser } from "../../components/CreateUser";
import { Login } from "../../components/Login";
import { useState } from "react";
import "./landingpage.css";

export function Landingpage() {
	const [view, setView] = useState(0);

	return (
		<div className="change-view-container">
			{!view ? (
				<>
					<Login />
					<button className="change-view-button" onClick={() => setView(!view)}>
						Create New Account
					</button>
				</>
			) : (
				<>
					<CreateUser />
					<button className="change-view-button" onClick={() => setView(!view)}>
						Login
					</button>
				</>
			)}
		</div>
	);
}
