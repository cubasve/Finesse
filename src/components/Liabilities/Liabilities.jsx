import React from 'react';
import GoodDebt from '../GoodDebt/GoodDebt';
import BadDebt from '../BadDebt/BadDebt';

export default function Liabilities(props) {
    return (
        <div>
            Liabilities
            <GoodDebt />
            <BadDebt />
        </div>
    )
}