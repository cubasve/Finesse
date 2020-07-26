import React from 'react';

export default function PassiveIncome(props) {
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
                                <option value="Real Estate" selected>Real Estate</option>
                                <option value="Business">Business</option>
                                <option value="Commodities">Commodities</option>
                            </select>
                        </td>
                        <td>$<input type="number" min="0" /><button>+</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}