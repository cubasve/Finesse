import React from 'react';
// import BalanceSheet from '../../components/BalanceSheet/BalanceSheet';
// import IncomeStatement from '../../components/IncomeStatement/IncomeStatement';
import Assets from '../../components/Assets/Assets';
import Liabilities from '../../components/Liabilities/Liabilities';
import Income from '../../components/Income/Income';
import Expenses from '../../components/Expenses/Expenses';

export default function FinancialStatementPage(props) {
    return (
        <div className='FinancialStatement'>
            {/* <main>
                <BalanceSheet />
                <IncomeStatement
                    addIncome={props.addIncome}
                    TyperError: Cannot read property 'earnedIncome' of undefined
                    earnedIncome={props.newEarnedIncome.earnedIncome}
                    amountEarned={props.newEarnedIncome.amountEarned}
                    newEarnedIncome={props.newEarnedIncome}
                    handleChange={props.handleChange}
                /> */}
            <main>
                <div>
                    Balance Sheet
                    <Assets />
                    <Liabilities />
                    EQUITY/NET WORTH = ASSETS - LIABILITIES
                </div>
                <div>
                    Income Statement
                    <Income
                        addIncome={props.addIncome}
                        newEarnedIncome={props.newEarnedIncome}
                        // amountEarned={props.amountEarned}
                        handleChange={props.handleChange}
                    />
                    <Expenses />
            CASH FLOW: INCOME - EXPENSES
        </div>
            </main>
        </div>
    )
}