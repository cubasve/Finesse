import React from 'react';
import './Income.css';
import Earned from '../EarnedIncome/EarnedIncome';
import Portfolio from '../PortfolioIncome/PortfolioIncome';
import Passive from '../PassiveIncome/PassiveIncome';


export default function Income({ totalIncome, totalEarnedIncome, newEarnedIncome, handleEarnedIncomeSubmit, handleEarnedIncomeChange, handleEarnedIncomeDelete, earnedFormInvalid, earnedFormRef, totalPortfolioIncome, newPortfolioIncome, handlePortfolioIncomeSubmit, handlePortfolioIncomeChange, handlePortfolioIncomeDelete, portfolioFormInvalid, portfolioFormRef, totalPassiveIncome, newPassiveIncome, handlePassiveIncomeSubmit, handlePassiveIncomeChange, handlePassiveIncomeDelete, passiveFormInvalid, passiveFormRef }) {
    return (
        <div className="border">
            <span className="title">
                <span>INCOME</span>
                <span className="right">$
                    {totalIncome.map(elem => elem.amount).reduce((acc, num) => acc + num, 0)}
                    {/* {totalIncome.map(elem => elem.amount).reduce(function (acc, num) {
                        return acc + num;
                    }, 0)} */}
                </span>
            </span>

            <Earned
                totalEarnedIncome={totalEarnedIncome}
                newEarnedIncome={newEarnedIncome}
                handleEarnedIncomeSubmit={handleEarnedIncomeSubmit}
                handleEarnedIncomeChange={handleEarnedIncomeChange}
                handleEarnedIncomeDelete={handleEarnedIncomeDelete}

                earnedFormInvalid={earnedFormInvalid}
                earnedFormRef={earnedFormRef}
                totalIncome={totalIncome}
            />
            <Portfolio
                totalPortfolioIncome={totalPortfolioIncome}
                newPortfolioIncome={newPortfolioIncome}
                handlePortfolioIncomeSubmit={handlePortfolioIncomeSubmit}
                handlePortfolioIncomeChange={handlePortfolioIncomeChange}
                handlePortfolioIncomeDelete={handlePortfolioIncomeDelete}

                portfolioFormInvalid={portfolioFormInvalid}
                portfolioFormRef={portfolioFormRef}
                totalIncome={totalIncome}
            />

            <Passive
                totalPassiveIncome={totalPassiveIncome}
                newPassiveIncome={newPassiveIncome}
                handlePassiveIncomeSubmit={handlePassiveIncomeSubmit}
                handlePassiveIncomeChange={handlePassiveIncomeChange}
                handlePassiveIncomeDelete={handlePassiveIncomeDelete}

                passiveFormInvalid={passiveFormInvalid}
                passiveFormRef={passiveFormRef}
                totalIncome={totalIncome}
            />
        </div>
    )
}