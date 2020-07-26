import React from 'react';

export default function PassiveIncome(props) {

    const passiveIncomeOptions = ['Real Estate', 'Business', 'Commodities'];
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
                        <td>$<input type="number" min="0" /><button>+</button></td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
}