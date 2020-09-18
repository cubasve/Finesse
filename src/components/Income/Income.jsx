import React from 'react';
import './Income.css';
import Earned from '../EarnedIncome/EarnedIncome';
import Portfolio from '../PortfolioIncome/PortfolioIncome';
import Passive from '../PassiveIncome/PassiveIncome';


export default function Income(props) {
    return (
        <div className="border">
            <span className="title">
                <span>INCOME</span>
                <span className="right">$
                    {/* {props.totalIncome.map(elem => elem.amount).reduce(function (acc, num) {
                    return acc + num;
                }, 0)} */}
                </span>
            </span>

            <Earned
                totalEarnedIncome={props.totalEarnedIncome}
                newEarnedIncome={props.newEarnedIncome}
                handleEarnedIncomeSubmit={props.handleEarnedIncomeSubmit}
                handleEarnedIncomeChange={props.handleEarnedIncomeChange}
                handleEarnedIncomeDelete={props.handleEarnedIncomeDelete}

                earnedFormInvalid={props.earnedFormInvalid}
                earnedFormRef={props.earnedFormRef}
            />
            <Portfolio
                totalPortfolioIncome={props.totalPortfolioIncome}
                newPortfolioIncome={props.newPortfolioIncome}
                handlePortfolioIncomeSubmit={props.handlePortfolioIncomeSubmit}
                handlePortfolioIncomeChange={props.handlePortfolioIncomeChange}

                portfolioFormInvalid={props.portfolioFormInvalid}
                portfolioFormRef={props.portfolioFormRef}
            />

            <Passive
                totalPassiveIncome={props.totalPassiveIncome}
                newPassiveIncome={props.newPassiveIncome}
                handlePassiveIncomeSubmit={props.handlePassiveIncomeSubmit}
                handlePassiveIncomeChange={props.handlePassiveIncomeChange}

                passiveFormInvalid={props.passiveFormInvalid}
                passiveFormRef={props.passiveFormRef}
            />
        </div>
    )
}