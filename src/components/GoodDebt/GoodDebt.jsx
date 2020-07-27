import React from 'react';

export default function GoodDebt(props) {

    const goodDebtOptions = ['Real Estate', 'Business', 'Paper', 'School Loans', 'Other'];
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Good Debt</th>
                        <th>$</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <select>
                                {goodDebtOptions.map((option) => (
                                    <option key={option}>{option}</option>)
                                )}
                            </select>
                        </td>
                        <td>$<input type="number" min="0" placeholder="Debt Value" /><button type="submit">+</button></td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
}