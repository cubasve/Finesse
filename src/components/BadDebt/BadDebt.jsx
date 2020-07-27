import React from 'react';

export default function badDebt(props) {

    const badDebtOptions = ['Home Mortgage', 'Car Loans', 'Credit Cards', 'School Loans', 'Other'];
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Bad Debt</th>
                        <th>$</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <select>
                                {badDebtOptions.map((option) => (
                                    <option key={option}>{option}</option>)
                                )}
                            </select>
                        </td>
                        <td>$<input type="number" min="0" pattern="\d+\.\d\d" placeholder="Debt Value" /><button type="submit">+</button></td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
}
