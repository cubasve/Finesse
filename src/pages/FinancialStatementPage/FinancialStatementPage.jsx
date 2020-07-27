import React from 'react';
import BalanceSheet from '../../components/BalanceSheet/BalanceSheet';
import IncomeStatement from '../../components/IncomeStatement/IncomeStatement';

export default function FinancialStatementPage(props) {
    return (
        <div className='FinancialStatement'>
            <main>
                <BalanceSheet />
                <IncomeStatement
                    addIncome={props.addIncome}
                    //TyperError: Cannot read property 'earnedIncome' of undefined
                    // earnedIncome={props.newEarnedIncome.earnedIncome}
                    // amountEarned={props.newEarnedIncome.amountEarned}
                    newEarnedIncome={props.newEarnedIncome}
                    handleChange={props.handleChange}
                />
            </main>
        </div>
    )
}