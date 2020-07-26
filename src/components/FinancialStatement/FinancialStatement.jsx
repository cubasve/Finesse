import React from 'react';
import BalanceSheet from '../BalanceSheet/BalanceSheet';
import IncomeStatement from '../IncomeStatement/IncomeStatement';
import NavBar from '../NavBar/NavBar';

export default function Liabilities(props) {
    return (
        <div className='FinancialStatement'>
            <NavBar user={props.user} handleLogout={props.handleLogout} />
            <main>
                <BalanceSheet />
                <IncomeStatement />
            </main>
        </div>
    )
}