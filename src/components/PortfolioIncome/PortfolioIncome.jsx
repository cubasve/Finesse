import React from 'react';

export default function PortfolioIncome(props) {
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
                        <td><input placeholder="Type" autocomplete="off" /></td>
                        <td>$<input type="number" min="0" /><button>+</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}