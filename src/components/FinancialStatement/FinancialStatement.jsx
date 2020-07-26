import React from 'react';
import BalanceSheet from '../BalanceSheet/BalanceSheet';
import IncomeStatement from '../IncomeStatement/IncomeStatement';

export default function Liabilities(props) {
    return (
        <div>
            <BalanceSheet />
            <IncomeStatement />
        </div>
    )
}