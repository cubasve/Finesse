import React from 'react';

export default function EarnedIncome(props) {

    const earnedIncomeOptions = ['Job', 'Self-Employment', 'Other'];
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
                            <select name="earnedIncome" value={props.newEarnedIncome.earnedIncome} handleChange={props.handleChange}>
                                {earnedIncomeOptions.map((option) => (
                                    <option key={option}>{option}</option>)
                                )}
                            </select>
                        </td>
                        <td>$
                            <input
                                name="amountEarned"
                                value={props.newEarnedIncome.amountEarned}
                                onClick={props.handleChange}
                                type="number"
                                min="0"
                                placeholder="Salary/Commissions"
                            />
                            <button onClick={props.addIncome}>+</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
}