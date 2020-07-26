import React from 'react';

export default function EarnedIncome(props) {
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
                        <td><input placeholder="Position" autocomplete="off" /></td>
                        <td>$<input type="number" min="0" /><button>+</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}