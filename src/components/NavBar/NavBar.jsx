import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import Navbar from 'react-bootstrap/NavBar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';

export default function NavBar(props) {
    let nav = props.user ?
        <div>
            <Form inline>
                <Nav>
                    <Link to="" className="NavBar-link" onClick={props.handleLogout}>Log Out</Link>
                </Nav>
            </Form>
        </div>
        :
        <div>
            <Form inline>
                <Nav className="NavBar-user">
                    <Link to="/login" className="NavBar-link">Log In</Link>
                    <Link to="/signup" className="NavBar-link">Sign Up</Link>
                </Nav>
            </Form>
        </div>

    return (
        <div className='NavBar'>
            <Navbar expand="lg" bg="dark" variant="dark" sticky="top">
                <Navbar.Brand href="/" className="NavBar-link">FINESSE</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {props.user && <Link className="NavBar-link" to='/financialstatement'>{props.user.name}'s Financial Statement</Link>}
                    </Nav>
                    {nav}
                </Navbar.Collapse>
            </Navbar>
        </div >
    );
}