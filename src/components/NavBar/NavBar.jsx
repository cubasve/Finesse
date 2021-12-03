import React from "react";
import "./NavBar.css";
import { Navbar, Nav } from "react-bootstrap";

export default function NavBar({ handleLogout, user }) {
	let nav = user ? (
		<div>
			<Nav>
				<Nav.Link href="/" className="NavBar-link" onClick={handleLogout}>
					Log Out
					{/* <NavDropdown title={user.name} id="basic-nav-dropdown">
						<NavDropdown.Item href="/">
							<Button
								onClick={handleLogout}
								variant="link"
								style={{
									textDecoration: "none",
									padding: 0,
									textAlign: "left",
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
				<Navbar.Brand href={user ? "/overview" : "/"} className="NavBar-link">
					FINESSE
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						{user && (
							<Nav.Link className="NavBar-link" href="/financialstatement">
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
