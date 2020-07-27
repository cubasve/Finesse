import React from 'react';
import Income from '../Income/Income';
import Expenses from '../Expenses/Expenses';

export default function IncomeStatement(props) {
    return (
        <div>
            Income Statement
            <Income
                addIncome={props.addIncome}
                earnedIncome={props.earnedIncome}
                amountEarned={props.amountEarned}
                handleChange={props.handleChange}
            />
            <Expenses />
            CASH FLOW: INCOME - EXPENSES
        </div>
    )
}