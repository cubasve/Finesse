import React from 'react';
import NavBar from '../../components/NavBar/NavBar';

export default function HomePage(props) {
    return (
        <div>
            <NavBar user={props.user} handleLogout={props.handleLogout} />
            Home Page
        </div>
    )
}