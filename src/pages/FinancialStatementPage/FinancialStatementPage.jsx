import React from 'react';
import BalanceSheet from '../../components/BalanceSheet/BalanceSheet';
import IncomeStatement from '../../components/IncomeStatement/IncomeStatement';

// import Assets from '../../components/Assets/Assets';
// import Liabilities from '../../components/Liabilities/Liabilities';
// import Income from '../../components/Income/Income';
// import Expenses from '../../components/Expenses/Expenses';

export default function FinancialStatementPage() {
    return (
        <div className='FinancialStatement' >
            <div>
                <span className="statement">BALANCE SHEET</span>
                <BalanceSheet />
            </div>

            <div>
                <span className="statement">INCOME STATEMENT</span>
                <IncomeStatement />
            </div>
        </div >
    )
}
