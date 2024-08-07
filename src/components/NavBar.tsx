import { ReactElement } from "react";
import { Link } from "react-router-dom";

export function NavBar(): ReactElement {
	return (
		<header className="navbar">
			<ul className="links">
				<Link to="/" className="link">Home</Link>
				<Link to="/add-todo" className="link">Add</Link>
				<Link to="/about" className="link">About</Link>
			</ul>
		</header>
	);
}