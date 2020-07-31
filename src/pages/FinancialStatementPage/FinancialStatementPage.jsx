import React from 'react';
import Assets from '../../components/Assets/Assets';
import Liabilities from '../../components/Liabilities/Liabilities';
import Income from '../../components/Income/Income';
import Expenses from '../../components/Expenses/Expenses';

export default function FinancialStatementPage(props) {
    return (
        <div className='FinancialStatement'>
            <div>
                <span className="statement">BALANCE SHEET</span>
                <Assets />
                <Liabilities />
                    EQUITY/NET WORTH = ASSETS - LIABILITIES
                </div>
            <div>
                <span className="statement">INCOME STATEMENT</span>
                <Income />
                <Expenses />
                    CASH FLOW: INCOME - EXPENSES
                </div>
        </div>
    )
}