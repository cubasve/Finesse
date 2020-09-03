import React from 'react';
import './Income.css';
import Earned from '../EarnedIncome/EarnedIncome';
import Portfolio from '../PortfolioIncome/PortfolioIncome';
import Passive from '../PassiveIncome/PassiveIncome';


export default function Income(props) {
    return (
        <div className="border">
            <span className="title">INCOME</span>

            <Earned />
            {props.portfolioIncome.map((portfolio, idx) =>
                <Portfolio
                    totalPortfolioIncome={props.totalPortfolioIncome}
                    portfolio={portfolio}
                    key={idx}
                    portfolioComponentDidMount={props.portfolioComponentDidMount}
                    handlePortfolioIncomeSubmit={props.handlePortfolioIncomeSubmit}
                    handlePortfolioIncomeChange={props.handlePortfolioIncomeChange}

                    formInvalid={props.formInvalid}
                    formRef={props.formRef} />
            )}
            <Passive />
        </div>
    )
}