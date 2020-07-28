import React from 'react';
import Earned from '../EarnedIncome/EarnedIncome';
import Portfolio from '../PortfolioIncome/PortfolioIncome';
import Passive from '../PassiveIncome/PassiveIncome';


export default function Income(props) {
    return (
        <div>
            Income
            <Earned />
            <Portfolio addIncome={props.addIncome} />
            <Passive addIncome={props.addIncome} />
        </div>
    )
}