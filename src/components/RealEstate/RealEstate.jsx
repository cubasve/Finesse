import React from 'react';

export default function RealEstate(props) {

    const realEstateOptions = ['Residential', 'Commercial', 'Industrial', 'Land'];
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Real Estate</th>
                        <th>$</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <select>
                                {realEstateOptions.map((option) => (
                                    <option key={option}>{option}</option>)
                                )}
                            </select>
                        </td>
                        <td>$<input type="number" min="0" placeholder="Purchase Price" /><button>+</button></td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
}