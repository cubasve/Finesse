import React from 'react';

export default function Commodities(props) {

    const commodityOptions = ['Metals', 'Energy', 'Livestock & Meat', 'Agriculture', 'Cryptocurrency', 'Other'];
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Commodities</th>
                        <th>$</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <select>
                                {commodityOptions.map((option) => (
                                    <option key={option}>{option}</option>)
                                )}
                            </select>
                        </td>
                        <td>$<input type="number" min="0" placeholder="Purchase Price" /><button type="submit">+</button></td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
}