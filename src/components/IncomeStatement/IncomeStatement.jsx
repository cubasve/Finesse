import React from 'react';
import Income from '../Income/Income';
import Expenses from '../Expenses/Expenses';

export default function IncomeStatement(props) {
    return (
        <div>
            Income Statement
            <Income />
            <Expenses />
            CASH FLOW: INCOME - EXPENSES
        </div>
    )
}