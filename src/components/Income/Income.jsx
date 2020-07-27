import React from 'react';
import Earned from '../EarnedIncome/EarnedIncome';
import Portfolio from '../PortfolioIncome/PortfolioIncome';
import Passive from '../PassiveIncome/PassiveIncome';


export default function Income(props) {
    return (
        <div>
            Income
            <Earned addIncome={props.addIncome}
                earnedIncome={props.newEarnedIncome.earnedIncome}
                amountEarned={props.newEarnedIncome.amountEarned}
                handleChange={props.handleChange}
            />
            <Portfolio addIncome={props.addIncome} />
            <Passive addIncome={props.addIncome} />
        </div>
    )
}