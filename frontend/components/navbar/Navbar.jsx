import { Link } from "react-router-dom";
import { pageData } from "../pageData";
import "./navbar.css";

export function Navbar() {
	return (
		<div className="navbar">
			{pageData.map((page, index) => {
				return (
					<Link key={index} to={page.path}>
						<button className="navbar-button">{page.name}</button>
					</Link>
				);
			})}
		</div>
	);
}
