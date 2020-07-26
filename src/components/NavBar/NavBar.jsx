import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
    return (
        <div className='NavBar'>
            <Link to="/login" className='NavBar-link'>LOG IN</Link>
            &nbsp;&nbsp;|&nbsp;&nvsp;
            <Link to="/signup" className='NavBar-link'>SIGN UP</Link>
        </div >
    );
}