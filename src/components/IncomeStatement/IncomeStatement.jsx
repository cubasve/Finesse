import React from 'react';
import Income from '../Income/Income';
import Expenses from '../Expenses/Expenses';

export default function BalanceSheet(props) {
    return (
        <div>
            Income Statement
            <Income />
            <Expenses />
        </div>
    )
}