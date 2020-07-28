import React from 'react';
import Assets from '../../components/Assets/Assets';
import Liabilities from '../../components/Liabilities/Liabilities';
import Income from '../../components/Income/Income';
import Expenses from '../../components/Expenses/Expenses';

export default function FinancialStatementPage(props) {
    return (
        <div className='FinancialStatement'>
            <main>
                <div>
                    BALANCE SHEET
                    <Assets />
                    <Liabilities />
                    EQUITY/NET WORTH = ASSETS - LIABILITIES
                </div>
                <div>
                    INCOME STATEMENT
                    <Income />
                    <Expenses />
            CASH FLOW: INCOME - EXPENSES
        </div>
            </main>
        </div>
    )
}