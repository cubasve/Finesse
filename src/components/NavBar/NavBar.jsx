import React, { useContext } from "react";
import "./NavBar.css";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import FinancialStatementContext from "../../context/FinancialStatementContext";
import { PersonCircle } from "react-bootstrap-icons";

export default function NavBar({ handleLogout, user }) {
	const { monthYear } = useContext(FinancialStatementContext);
	const { month, year } = monthYear;

	const getUserFirstName = (name) => {
		const foundIndex = name.indexOf(" ");
		if (foundIndex === -1) return name;
		return name.slice(0, foundIndex);
	};

	let nav = user ? (
		<div>
			<Nav>
				<NavDropdown
					title={
						<>
							<PersonCircle size={25} />
							<Navbar.Text style={{ margin: "0px 15px" }}>
								{getUserFirstName(user.name)}
							</Navbar.Text>
						</>
					}
					id="collasible-nav-dropdown"
				>
					<NavDropdown.Item href="/">
						<Button
							onClick={() => {
								handleLogout();
								sessionStorage.clear();
							}}
							variant="link"
							style={{
								textDecoration: "none",
								padding: 0,
								color: "black",
							}}
						>
							Log Out
						</Button>
					</NavDropdown.Item>
				</NavDropdown>
			</Nav>
		</div>
	) : (
		<div>
			<Nav className="NavBar-user">
				<Nav.Link href="/login" className="NavBar-link">
					Log In
				</Nav.Link>
				<Nav.Link href="/signup" className="NavBar-link">
					Sign Up
				</Nav.Link>
			</Nav>
		</div>
	);

	return (
		<div className="NavBar">
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
				<Navbar.Brand href={user ? "/overview" : "/"} className="NavBar-link">
					FINESSE
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						{user && (
							<Nav.Link
								className="NavBar-link"
								href={`/financialstatement/${year}/${month}`}
							>
								Financial Statement
							</Nav.Link>
						)}
					</Nav>
					{nav}
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
}
