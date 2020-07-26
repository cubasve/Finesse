import React from 'react';
import BalanceSheet from '../../components/BalanceSheet/BalanceSheet';
import IncomeStatement from '../../components/IncomeStatement/IncomeStatement';
import NavBar from '../../components/NavBar/NavBar';

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