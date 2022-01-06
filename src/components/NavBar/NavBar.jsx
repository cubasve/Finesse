import React, { useContext } from "react";
import "./NavBar.css";
import { Navbar, Nav /* NavDropdown, Button */ } from "react-bootstrap";
import FinancialStatementContext from "../../context/FinancialStatementContext";
//import { PersonCircle } from "react-bootstrap-icons";

export default function NavBar({ handleLogout, user }) {
	const { year, month } = useContext(FinancialStatementContext);
	let nav = user ? (
		<div>
			<Nav>
				<Nav.Link href="/" className="NavBar-link" onClick={handleLogout}>
					Log Out
					{/* <NavDropdown
					align="end"
					title={
						<>
							{user.name}
							<PersonCircle size={25} />
						</>
					}
					id="basic-nav-dropdown"
				>
					<NavDropdown.Item href="/">
						<Button
							onClick={handleLogout}
							variant="link"
							style={{
								textDecoration: "none",
								padding: 0,
								textAlign: "left",
								color: "black",
							}}
						>
							Log Out
						</Button>
					</NavDropdown.Item>
				</NavDropdown> */}
				</Nav.Link>
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
			<Navbar expand="lg" bg="dark" variant="dark" fixed="top">
				<Navbar.Brand
					/*href={user ? "/overview" : "/"}*/ href="/"
					className="NavBar-link"
				>
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
								{user.name}'s Financial Statement
							</Nav.Link>
						)}
					</Nav>
					{nav}
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
}
