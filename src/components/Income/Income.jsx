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
                <span>$
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

                formInvalid={props.formInvalid}
                // formRef={props.formRef}
                earnedFormRef={props.earnedFormRef}
            />
            <Portfolio
                totalPortfolioIncome={props.totalPortfolioIncome}
                newPortfolioIncome={props.newPortfolioIncome}
                handlePortfolioIncomeSubmit={props.handlePortfolioIncomeSubmit}
                handlePortfolioIncomeChange={props.handlePortfolioIncomeChange}

                formInvalid={props.formInvalid}
                // formRef={props.formRef}
                portfolioFormRef={props.portfolioFormRef}
            />

            <Passive
                totalPassiveIncome={props.totalPassiveIncome}
                newPassiveIncome={props.newPassiveIncome}
                handlePassiveIncomeSubmit={props.handlePassiveIncomeSubmit}
                handlePassiveIncomeChange={props.handlePassiveIncomeChange}

                formInvalid={props.formInvalid}
                // formRef={props.formRef}
                passiveFormRef={props.passiveFormRef}
            />
        </div>
    )
}