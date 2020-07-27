import React from 'react';
import Income from '../Income/Income';
import Expenses from '../Expenses/Expenses';

export default function IncomeStatement(props) {
    return (
        <div>
            Income Statement
            <Income
                addIncome={props.addIncome}
                // earnedIncome={props.newEarnedIncome.earnedIncome}
                // amountEarned={props.newEarnedIncome.amountEarned}
                handleChange={props.handleChange}
            />
            <Expenses />
            CASH FLOW: INCOME - EXPENSES
        </div>
    )
}