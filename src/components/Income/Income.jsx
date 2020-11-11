import React from 'react';
import './Income.css';
import Earned from '../EarnedIncome/EarnedIncome';
import Portfolio from '../PortfolioIncome/PortfolioIncome';
import Passive from '../PassiveIncome/PassiveIncome';

function calculateTotalIncome(totalIncomeNumber) {
    if (!totalIncomeNumber) return 0;
    return totalIncomeNumber.toFixed(2);
}


export default function Income({ totalIncome, totalEarnedIncome, newEarnedIncome, handleEarnedIncomeSubmit, handleEarnedIncomeChange, handleEarnedIncomeDelete, earnedFormInvalid, earnedFormRef, totalPortfolioIncome, newPortfolioIncome, handlePortfolioIncomeSubmit, handlePortfolioIncomeChange, handlePortfolioIncomeDelete, portfolioFormInvalid, portfolioFormRef, totalPassiveIncome, newPassiveIncome, handlePassiveIncomeSubmit, handlePassiveIncomeChange, handlePassiveIncomeDelete, passiveFormInvalid, passiveFormRef }) {

    const totalIncomeNumber = totalIncome.map(elem => elem.amount).reduce((acc, num) => acc + num, 0);

    return (
        <div className="border">
            <span className="title">
                <span>INCOME</span>
                <span className="right">${calculateTotalIncome(totalIncomeNumber)}</span>
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