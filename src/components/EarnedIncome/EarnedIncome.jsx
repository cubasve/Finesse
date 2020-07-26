import React from 'react';

export default function EarnedIncome(props) {

    const earnedIncomeOptions = ['Job', 'Self-Employment'];
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Earned</th>
                        <th>$</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <select>
                                {earnedIncomeOptions.map((option, index) => (
                                    <option>{option}</option>)
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