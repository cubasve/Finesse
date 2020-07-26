import React from 'react';

export default function PaperAssets(props) {

    const paperAssetsOptions = ['Stocks', 'Bonds', 'Index/Mutual Funds', 'GICs', 'REITs', 'Other'];
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Paper</th>
                        <th>$</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <select>
                                {paperAssetsOptions.map((option) => (
                                    <option key={option}>{option}</option>)
                                )}
                            </select>
                        </td>
                        <td>$<input type="number" min="0" placeholder="Shares x Price" /><button>+</button></td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
}