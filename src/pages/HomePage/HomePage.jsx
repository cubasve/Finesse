import React from 'react';
import { Link } from 'react-router-dom';
// import NavBar from '../../components/NavBar/NavBar';

export default function HomePage(props) {
    return (
        <div>
            {/* <NavBar user={props.user} handleLogout={props.handleLogout} /> */}
            {props.user && <Link className='btn btn-default FinancialStatementPage-link-margin' to='/financialstatement'>FINANCIAL STATEMENT</Link>}

            {/* BECOME FINANCIALLY LITERATE

            Using Financial Statements */}
        </div>
    )
}

