import React from 'react';

export default function PassiveIncome(props) {

    const passiveIncomeOptions = ['Real Estate', 'Business', 'Commodities', 'Royalties', 'Other'];
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Passive</th>
                        <th>$</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <select>
                                {passiveIncomeOptions.map((option) => (
                                    <option key={option}>{option}</option>)
                                )}
                            </select>
                        </td>
                        <td>$<input type="number" min="0" placeholder="" /><button type="submit">+</button></td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
}