import React from 'react';

export default function PortfolioIncome(props) {

    const portfolioIncomeOptions = ['Stocks', 'Bonds', 'Index/Mutual Funds', 'GICs'];
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Portfolio</th>
                        <th>$</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <select>
                                {portfolioIncomeOptions.map((option) => (
                                    <option key={option}>{option}</option>)
                                )}
                            </select>
                        </td>
                        <td>$<input type="number" min="0" /><button>+</button></td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
}