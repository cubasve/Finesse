import React from 'react';
import BalanceSheet from '../../components/BalanceSheet/BalanceSheet';
import IncomeStatement from '../../components/IncomeStatement/IncomeStatement';

export default function FinancialStatementPage(props) {
    return (
        <div className='FinancialStatement'>
            <main>
                <BalanceSheet />
                <IncomeStatement addIncome={props.addIncome} />
            </main>
        </div>
    )
}