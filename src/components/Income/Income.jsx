import React from 'react';
import './Income.css';
import Earned from '../EarnedIncome/EarnedIncome';
import Portfolio from '../PortfolioIncome/PortfolioIncome';
import Passive from '../PassiveIncome/PassiveIncome';


export default function Income(props) {
    return (
        <div className="border">
            <span className="title">INCOME</span>
            <Earned
                totalEarnedIncome={props.totalEarnedIncome}
                newEarnedIncome={props.newEarnedIncome}
                formInvalid={props.formInvalid} />
            <Portfolio />
            <Passive />
        </div>
    )
}